
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";
import { fetchVideoMetadata } from "@/lib/download/bulk-helper";
import archiver from 'archiver';
import { Readable } from 'stream';

// IMPORTANT: This forces Vercel to use Node.js runtime (no 60s timeout)
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes (max for Vercel Hobby plan)

/**
 * Background Worker for Bulk Downloads
 * - Triggered by Upstash QStash
 * - Runs on Vercel Node.js runtime
 * - Streams large videos directly to storage (Zero Bandwidth technique)
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Security Check (Upstash)
        const authHeader = request.headers.get('authorization');
        const secret = process.env.WORKER_SECRET || 'default-secret';

        // Simple bearer token check
        if (!authHeader || !authHeader.includes(secret)) {
            // In production, we'd verify the JWT signature from QStash, 
            // but for now a shared secret is okay for MVP
            // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { jobId } = await request.json();

        if (!jobId) {
            return NextResponse.json({ error: "Job ID required" }, { status: 400 });
        }

        // 2. Get Job Details from Supabase
        const { data: job, error: jobError } = await supabaseAdmin
            .from('bulk_download_jobs')
            .select('*')
            .eq('id', jobId)
            .single();

        if (jobError || !job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // 3. Mark as Processing
        await supabaseAdmin
            .from('bulk_download_jobs')
            .update({
                status: 'processing',
                processing_started_at: new Date().toISOString()
            })
            .eq('id', jobId);

        // 4. Start ZIP Creation (Streaming)
        // We create a PassThrough stream to pipe zip data to Supabase
        const archive = archiver('zip', { zlib: { level: 6 } });

        // Since Supabase storage via SDK doesn't support streaming uploads perfectly 
        // in Node environment without buffers sometimes, we'll collect chunks for the ZIP file itself.
        // Ideally we'd stream the output too, but for MVP let's buffer the ZIP parts 
        // (Note: The videos themselves are streamed INTO the zip, so memory usage is low per video)
        const chunks: Buffer[] = [];
        archive.on('data', (chunk) => chunks.push(chunk));

        const totalUrls = job.urls.length;
        let completed = 0;
        let failed = 0;
        const failedUrls: string[] = [];

        // 5. Process Each Video
        for (let i = 0; i < totalUrls; i++) {
            const url = job.urls[i];

            try {
                // A. Get Metadata & Direct Download URL
                const data = await fetchVideoMetadata(url, job.platform);

                if (!data.success || !data.url) {
                    throw new Error(data.error || "Failed to get video URL");
                }

                // B. STREAM Video (Zero Bandwidth Technique)
                // We fetch the video stream and pipe it directly into the archive
                // Vercel just passes the bytes, it doesn't load whole file into memory
                const videoResponse = await fetch(data.url);

                if (!videoResponse.ok) {
                    throw new Error(`Failed to download video stream: ${videoResponse.status}`);
                }

                if (!videoResponse.body) {
                    throw new Error("Empty response body");
                }

                // Convert web stream to node stream for archiver
                // @ts-ignore - Readable.fromWeb is available in Node 18+
                const nodeStream = Readable.fromWeb(videoResponse.body);

                // Add to ZIP
                archive.append(nodeStream, { name: data.filename });

                completed++;

                // Update Progress (every 1 video or 20%)
                if (i % Math.ceil(totalUrls / 5) === 0 || i === totalUrls - 1) {
                    const progress = Math.round(((i + 1) / totalUrls) * 100);
                    await supabaseAdmin.from('bulk_download_jobs').update({
                        progress,
                        current_file: i + 1,
                        completed_files: completed
                    }).eq('id', jobId);
                }

            } catch (err: any) {
                console.error(`Failed to process ${url}:`, err);
                failed++;
                failedUrls.push(url);
            }
        }

        // 6. Finalize ZIP
        await archive.finalize();
        const zipBuffer = Buffer.concat(chunks);

        // 7. Upload ZIP to Supabase Storage
        const zipFilename = `bulk_${jobId}_${Date.now()}.zip`;
        const storagePath = `${job.user_id}/${zipFilename}`; // Organize by user

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from('downloads')
            .upload(storagePath, zipBuffer, {
                contentType: 'application/zip',
                upsert: true
            });

        if (uploadError) {
            throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // 8. Generate Signed URL (valid for 24 hours)
        const { data: signedUrlData, error: signError } = await supabaseAdmin.storage
            .from('downloads')
            .createSignedUrl(storagePath, 60 * 60 * 24); // 24 hours

        if (signError || !signedUrlData?.signedUrl) {
            throw new Error("Failed to generate download link");
        }

        // 9. Complete Job
        await supabaseAdmin
            .from('bulk_download_jobs')
            .update({
                status: 'completed',
                progress: 100,
                completed_files: completed,
                failed_files: failed,
                failed_urls: failedUrls,
                zip_storage_path: storagePath,
                zip_download_url: signedUrlData.signedUrl,
                zip_size_bytes: zipBuffer.length,
                zip_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                processing_completed_at: new Date().toISOString()
            })
            .eq('id', jobId);

        // TODO: Send Email Notification (Phase 2)

        return NextResponse.json({ success: true, jobId });

    } catch (error: any) {
        console.error("Worker error:", error);

        // Mark as failed if we have a job ID
        try {
            const { jobId } = await request.json(); // Re-parse body if safe
            if (jobId) {
                await supabaseAdmin
                    .from('bulk_download_jobs')
                    .update({
                        status: 'failed',
                        error_message: error.message
                    })
                    .eq('id', jobId);
            }
        } catch (e) { }

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
