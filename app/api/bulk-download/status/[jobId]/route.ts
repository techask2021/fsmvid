import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = "edge";

export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const { jobId } = await params;

        if (!jobId) {
            return NextResponse.json({ error: "Job ID required" }, { status: 400 });
        }

        // Fetch job details
        const { data: job, error } = await supabaseAdmin
            .from('bulk_download_jobs')
            .select('*')
            .eq('id', jobId)
            .single();

        if (error || !job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Return status
        return NextResponse.json({
            jobId: job.id,
            status: job.status,
            progress: job.progress,
            total: job.total_files,
            completed: job.completed_files,
            failed: job.failed_files,
            quality: job.quality_preference,
            format: job.format_preference,
            platform: job.platform,
            zipUrl: job.zip_download_url,
            results: job.processed_urls,
            expiresAt: job.zip_expires_at,
            error: job.error_message
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
