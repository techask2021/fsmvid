import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = "edge"; // Runs on Cloudflare (cheap & fast)

export async function POST(request: NextRequest) {
    try {
        const { urls, userId, quality_preference, format_preference, platform } = await request.json();

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json({ error: "Invalid URLs" }, { status: 400 });
        }

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // 1. Check User Credits
        let { data: user, error: userError } = await supabaseAdmin
            .from('users')
            .select('credits')
            .eq('id', userId)
            .maybeSingle();

        // DEV MODE: Auto-provision mock user if missing
        const isLocal = process.env.NODE_ENV === 'development';
        if (!user && isLocal && userId === '00000000-0000-0000-0000-000000000000') {
            console.log("🛠️ DEV MODE: Auto-provisioning mock user...");
            const { data: newUser, error: createError } = await supabaseAdmin
                .from('users')
                .insert({ id: userId, email: 'admin@fsmvid.com', credits: 100 })
                .select()
                .single();

            if (createError) {
                console.error("❌ Failed to auto-provision user:", createError);

                // Specific helpful message for foreign key errors
                if (createError.code === '23503') {
                    return NextResponse.json({
                        error: "Supabase Security Constraint",
                        details: "Your 'users' table is strictly linked to Supabase Auth. Please run the SQL fix I provided to allow the Mock Account to work."
                    }, { status: 500 });
                }

                return NextResponse.json({
                    error: "Provisioning Failed",
                    details: createError.message
                }, { status: 500 });
            }
            user = newUser;
        }

        if (userError || !user) {
            console.error("User fetch error:", userError);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Calculate cost (1 credit = 2 videos)
        const creditsNeeded = Math.ceil(urls.length / 2);

        if (user.credits < creditsNeeded) {
            return NextResponse.json({
                error: "Insufficient credits",
                required: creditsNeeded,
                available: user.credits
            }, { status: 402 });
        }

        // 2. Deduct Credits
        const { error: deductError } = await supabaseAdmin.rpc('deduct_credits', {
            user_id: userId,
            amount: creditsNeeded
        });

        if (deductError) {
            console.error("❌ Credit deduction failed:", deductError);
            return NextResponse.json({ error: "Failed to deduct credits. Check if 'deduct_credits' function exists in Supabase." }, { status: 500 });
        }

        // 3. Create Job Record
        const { data: job, error: jobError } = await supabaseAdmin
            .from('bulk_download_jobs')
            .insert({
                user_id: userId,
                urls: urls,
                total_files: urls.length,
                status: 'queued',
                credits_used: creditsNeeded,
                quality_preference: quality_preference || '1080',
                format_preference: format_preference || 'mp4',
                platform: platform || 'Other'
            })
            .select()
            .single();

        if (jobError) {
            // TODO: Refund credits if job creation fails (though unlikely)
            console.error("Job creation failed:", jobError);
            return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
        }

        // 4. Trigger Background Worker
        let workerUrl = process.env.VERCEL_WORKER_URL || "";
        const qstashUrl = process.env.QSTASH_URL;
        const qstashToken = process.env.QSTASH_TOKEN;

        console.log("📡 Triggering Worker...");
        console.log("- Worker URL Config:", workerUrl ? "SET" : "MISSING");
        console.log("- QStash URL Config:", qstashUrl ? "SET" : "MISSING");
        console.log("- QStash Token Config:", qstashToken ? "SET" : "MISSING");

        // Smart Worker URL: Ensure it has the full path
        if (workerUrl && !workerUrl.includes('/api/workers/')) {
            workerUrl = workerUrl.replace(/\/$/, '') + '/api/workers/process-bulk';
        }

        console.log("- Final Resolved Worker URL:", workerUrl);

        if (isLocal) {
            const finalLocalUrl = workerUrl.includes('localhost') ? workerUrl : `http://localhost:3000/api/workers/process-bulk`;
            console.log("🚀 DEV MODE: Detaching local worker...");

            // No 'await' here means the user gets their response INSTANTLY
            fetch(finalLocalUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.WORKER_SECRET || 'default-secret'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId: job.id })
            }).catch(e => console.error("❌ Local Worker trigger failed:", e.message));

            console.log("✅ API: Handshake complete.");

        } else if (qstashUrl && qstashToken && workerUrl) {
            console.log("🌐 Production Mode: Publishing to QStash...");
            try {
                const qstashEndpoint = `${qstashUrl.replace(/\/$/, '')}/v2/publish/${encodeURIComponent(workerUrl)}`;
                console.log("- QStash Endpoint:", qstashEndpoint);

                const qRes = await fetch(qstashEndpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${qstashToken}`,
                        'Content-Type': 'application/json',
                        'Upstash-Forward-Authorization': `Bearer ${process.env.WORKER_SECRET || 'default-secret'}`
                    },
                    body: JSON.stringify({ jobId: job.id })
                });

                if (!qRes.ok) {
                    const qErr = await qRes.text();
                    console.error("❌ QStash Error Response:", qRes.status, qErr);
                } else {
                    console.log("✅ QStash: Message published successfully.");
                }
            } catch (qError: any) {
                console.error("❌ Failed to queue job via QStash:", qError.message);
            }
        } else {
            console.warn("⚠️ QStash/Worker configuration missing - job created but not queued automatically");
            console.log("- Missing details:", {
                qstashUrl: !!qstashUrl,
                qstashToken: !!qstashToken,
                workerUrl: !!workerUrl
            });
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
