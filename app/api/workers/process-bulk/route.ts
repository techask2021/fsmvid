
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";
import { fetchVideoMetadata } from "@/lib/download/bulk-helper";
import archiver from "archiver";
import { PassThrough, Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import { r2Client, R2_BUCKET, isR2Configured } from "@/lib/api/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
    let jobId: string | null = null;

    try {
        const body = await request.json();
        jobId = body.jobId;

        if (!jobId) {
            return NextResponse.json({ error: "Job ID required" }, { status: 400 });
        }

        console.log(`🚀 Worker [${jobId}]: Igniting 'Store' Engine (Max Speed)...`);

        const response = NextResponse.json({ success: true, message: "Engine ignited" });

        (async () => {
            try {
                const { data: job, error: jobError } = await supabaseAdmin
                    .from('bulk_download_jobs')
                    .select('*')
                    .eq('id', jobId)
                    .single();

                if (jobError || !job) throw new Error("Job not found");
                if (!isR2Configured) throw new Error("R2 not configured.");

                await supabaseAdmin.from('bulk_download_jobs').update({
                    status: 'processing',
                    processing_started_at: new Date().toISOString(),
                    progress: 5
                }).eq('id', jobId);

                // --- ZIP SETUP (STORE MODE = 0) ---
                // We use level 0 because videos are already compressed. This is 10x faster.
                const archive = archiver('zip', { store: true });
                const zipStream = new PassThrough({ highWaterMark: 1024 * 1024 * 10 }); // 10MB fast pipe
                archive.pipe(zipStream);

                const zipKey = `bulks/${jobId}/FSMVID_Batch.zip`;

                const upload = new Upload({
                    client: r2Client,
                    params: {
                        Bucket: R2_BUCKET,
                        Key: zipKey,
                        Body: zipStream,
                        ContentType: 'application/zip'
                    },
                    queueSize: 1,
                    partSize: 10 * 1024 * 1024, // 10MB chunks for R2 speed
                });

                const uploadPromise = upload.done();

                const totalUrls = job.urls.length;
                let completed = 0;
                let failed = 0;
                const processedFiles: any[] = [];

                // SPEED BOOST: Pre-fetch all metadata in parallel
                console.log("🔍 Pre-fetching metadata for all links...");
                await supabaseAdmin.from('bulk_download_jobs').update({ error_message: "🔍 Analyzing all links..." }).eq('id', jobId);

                const metaTasks = job.urls.map((url: string) =>
                    fetchVideoMetadata(url, job.platform, job.quality_preference, job.format_preference)
                );
                const allMetadata = await Promise.all(metaTasks);

                for (let i = 0; i < totalUrls; i++) {
                    const data = allMetadata[i];
                    const url = job.urls[i];

                    try {
                        if (!data.success || !data.url) throw new Error("Link fetch failed");

                        await supabaseAdmin.from('bulk_download_jobs').update({
                            error_message: `⬇️ Adding to ZIP: ${data.filename.substring(0, 20)}...`,
                            progress: Math.round(((i / totalUrls) * 85) + 10)
                        }).eq('id', jobId);

                        console.log(`   ⬇️ Processing: ${data.filename}`);
                        const videoRes = await fetch(data.url);
                        if (!videoRes.ok) throw new Error(`HTTP ${videoRes.status}`);

                        const nodeStream = Readable.fromWeb(videoRes.body as any);

                        // We await the STREAM END, which is the fastest way to pipe
                        await new Promise<void>((resolve, reject) => {
                            archive.append(nodeStream, { name: data.filename });
                            nodeStream.on('end', resolve);
                            nodeStream.on('error', reject);
                        });

                        processedFiles.push({
                            original_url: url,
                            download_url: data.url,
                            filename: data.filename,
                            title: data.metadata?.title || 'Video'
                        });

                        completed++;

                        await supabaseAdmin.from('bulk_download_jobs').update({
                            completed_files: completed,
                            processed_urls: [...processedFiles]
                        }).eq('id', jobId);

                    } catch (err: any) {
                        console.error(`   ❌ Failed:`, err.message);
                        failed++;
                        await supabaseAdmin.from('bulk_download_jobs').update({ failed_files: failed }).eq('id', jobId);
                    }
                }

                console.log("🗜️ Finalizing ZIP (Instantly in 'Store' mode)...");
                await archive.finalize();

                console.log("☁️ Closing R2 Upload...");
                await supabaseAdmin.from('bulk_download_jobs').update({ error_message: "☁️ Uploading final package..." }).eq('id', jobId);
                await uploadPromise;

                const signedUrl = await getSignedUrl(r2Client, new GetObjectCommand({
                    Bucket: R2_BUCKET,
                    Key: zipKey
                }), { expiresIn: 86400 });

                await supabaseAdmin.from('bulk_download_jobs').update({
                    status: 'completed',
                    progress: 100,
                    completed_files: completed,
                    failed_files: failed,
                    zip_download_url: signedUrl,
                    zip_expires_at: new Date(Date.now() + 86400 * 1000).toISOString(),
                    processing_completed_at: new Date().toISOString(),
                    error_message: null
                }).eq('id', jobId);

                console.log(`✅ Bulk Process Complete [${jobId}]`);

            } catch (bgError: any) {
                console.error(`🚨 Fatal:`, bgError.message);
                if (jobId) {
                    await supabaseAdmin.from('bulk_download_jobs').update({
                        status: 'failed',
                        error_message: bgError.message
                    }).eq('id', jobId);
                }
            }
        })();

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
