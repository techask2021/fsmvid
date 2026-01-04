
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export async function GET(request: NextRequest) {
    try {
        // 1. Total Users
        const { count: totalUsers } = await supabaseAdmin
            .from('users')
            .select('*', { count: 'exact', head: true });

        // 2. Pending Payments
        const { count: pendingPayments } = await supabaseAdmin
            .from('payment_orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        // 3. Total Jobs
        const { count: totalJobs } = await supabaseAdmin
            .from('bulk_download_jobs')
            .select('*', { count: 'exact', head: true });

        // 4. Total Credits in system
        const { data: usersData } = await supabaseAdmin
            .from('users')
            .select('credits');

        const systemCredits = usersData?.reduce((acc: number, u: any) => acc + (u.credits || 0), 0) || 0;

        // 5. Recent Jobs
        const { data: recentJobs } = await supabaseAdmin
            .from('bulk_download_jobs')
            .select('*, users(email)')
            .order('created_at', { ascending: false })
            .limit(5);

        return NextResponse.json({
            stats: {
                totalUsers,
                pendingPayments,
                totalJobs,
                systemCredits
            },
            recentJobs
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
