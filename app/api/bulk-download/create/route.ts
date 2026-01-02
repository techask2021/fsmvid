import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = "edge"; // Runs on Cloudflare (cheap & fast)

export async function POST(request: NextRequest) {
    try {
        const { urls, quality, format, userId } = await request.json();

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json({ error: "URLs are required" }, { status: 400 });
        }

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 401 });
        }

        // 1. Check User Credits
        const { data: user, error: userError } = await supabaseAdmin
            .from('users')
            .select('credits')
            .eq('id', userId)
            .single();

        if (userError || !user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Calculate cost (1 credit = 2 videos)
        const creditsNeeded = Math.ceil(urls.length / 2);

        if (user.credits < creditsNeeded) {
            return NextResponse.json({
                error: "Insufficient credits",
                required: creditsNeeded,
                available: user.credits
            }, { status: 402 }); // Payment Required
        }

        // 2. Deduct Credits (using the RPC function we created)
        const { error: deductError } = await supabaseAdmin.rpc('deduct_credits', {
            user_id: userId,
            amount: creditsNeeded
        });

        if (deductError) {
            console.error("Credit deduction failed:", deductError);
            return NextResponse.json({ error: "Failed to process credits" }, { status: 500 });
        }

        // 3. Create Job Record
        const { data: job, error: jobError } = await supabaseAdmin
            .from('bulk_download_jobs')
            .insert({
                user_id: userId,
                urls: urls,
                total_files: urls.length,
                quality_preference: quality || 'auto',
                format_preference: format || 'mp4',
                credits_used: creditsNeeded,
                status: 'queued'
            })
            .select()
            .single();

        if (jobError) {
            // TODO: Refund credits if job creation fails (though unlikely)
            console.error("Job creation failed:", jobError);
            return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
        }

        // 4. Trigger Background Worker
        // We send this to the Vercel worker we'll create in next step
        const qstashUrl = process.env.QSTASH_URL;
        const qstashToken = process.env.QSTASH_TOKEN;
        const workerUrl = process.env.VERCEL_WORKER_URL;

        // Check if running in local dev mode
        const isLocal = process.env.NODE_ENV === 'development' || workerUrl?.includes('localhost');

        if (isLocal && workerUrl) {
            // LOCAL DEV MODE: Call worker directly (bypass QStash) because QStash can't reach localhost
            console.log("🛠️ DEV MODE: Calling worker directly:", workerUrl);
            // Fire and forget (don't await)
            fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.WORKER_SECRET || 'default-secret'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId: job.id })
            }).catch(e => console.error("Worker call failed:", e));

        } else if (qstashUrl && qstashToken && workerUrl) {
            try {
                await fetch(`${qstashUrl}/v2/publish/${encodeURIComponent(workerUrl)}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${qstashToken}`,
                        'Content-Type': 'application/json',
                        // Simple secret validation
                        'Upstash-Forward-Authorization': `Bearer ${process.env.WORKER_SECRET || 'default-secret'}`
                    },
                    body: JSON.stringify({ jobId: job.id })
                });
            } catch (qError) {
                console.error("Failed to queue job:", qError);
                // We still return success because the job is in DB and can be retried/picked up
            }
        } else {
            console.warn("QStash/Worker configuration missing - job created but not queued automatically");
        }

        return NextResponse.json({
            success: true,
            jobId: job.id,
            creditsDeducted: creditsNeeded,
            remainingCredits: user.credits - creditsNeeded,
            message: "Job started successfully"
        });

    } catch (error: any) {
        console.error("Bulk create error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
