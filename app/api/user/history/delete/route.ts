
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { jobIds, userId } = body;

        if (!jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
            return NextResponse.json({ error: "No jobs selected" }, { status: 400 });
        }
        if (!userId) {
            return NextResponse.json({ error: "User unauthorized" }, { status: 401 });
        }

        const { error } = await supabaseAdmin
            .from('bulk_download_jobs')
            .delete()
            .in('id', jobIds)
            .eq('user_id', userId); // Security: Ensure user owns the jobs

        if (error) throw error;

        return NextResponse.json({ success: true, count: jobIds.length });

    } catch (error: any) {
        console.error("Delete history error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
