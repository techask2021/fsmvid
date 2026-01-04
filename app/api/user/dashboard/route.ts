
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/api/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    try {
        // 1. Fetch Profile
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError && profileError.code !== 'PGRST116') {
            console.error("Profile fetch error:", profileError);
        }

        // 2. Fetch History
        const { data: history, error: historyError } = await supabaseAdmin
            .from('bulk_download_jobs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(20);

        if (historyError) {
            console.error("History fetch error:", historyError);
        }

        return NextResponse.json({
            profile: profile || null,
            history: history || []
        });

    } catch (err: any) {
        console.error("Dashboard API error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
