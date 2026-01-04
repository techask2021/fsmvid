
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export async function GET(request: NextRequest) {
    try {
        const { data: users, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, action, value } = body;

        if (action === 'update_credits') {
            const { error } = await supabaseAdmin
                .from('users')
                .update({ credits: value })
                .eq('id', userId);
            if (error) throw error;
        }

        if (action === 'update_plan') {
            const { error } = await supabaseAdmin
                .from('users')
                .update({ subscription_plan: value })
                .eq('id', userId);
            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
