import { NextResponse } from 'next/server';
import { supabaseAdmin } from "@/lib/api/supabase";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const { data: payments, error } = await supabaseAdmin
            .from('payment_orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ payments });
    } catch (error) {
        console.error("Error fetching user payments:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
