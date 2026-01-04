import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge';
import { supabaseAdmin } from "@/lib/api/supabase";

export async function GET(request: NextRequest) {
    try {
        const { data: payments, error } = await supabaseAdmin
            .from('payment_orders')
            .select('*, users(email)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ payments });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId, action, creditsToAdd, reason } = body;

        if (action === 'approve') {
            // Using the RPC function defined in payment_schema.sql
            const { error } = await supabaseAdmin.rpc('approve_payment_order', {
                order_id: orderId,
                credits_to_add: creditsToAdd
            });
            if (error) throw error;
        }

        if (action === 'reject') {
            // Using the RPC function
            const { error } = await supabaseAdmin.rpc('reject_payment_order', {
                order_id: orderId,
                reason: reason || 'Transaction not found or invalid'
            });
            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
