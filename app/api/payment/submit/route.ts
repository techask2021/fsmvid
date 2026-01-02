
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, plan, txHash, amount } = body;

        // Validate Input
        if (!userId || !plan || !txHash || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Insert Order Record
        // NOTE: You'll need to create this table in Supabase (I'll give SQL for Step 6)
        const { error } = await supabaseAdmin
            .from('payment_orders')
            .insert({
                user_id: userId,
                plan_id: plan,
                amount: amount,
                tx_hash: txHash,
                status: 'pending',
                provider: 'binance_manual'
            });

        if (error) {
            console.error("Payment insert error:", error);
            return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
        }

        // Send Admin Email Notification (Optional - using Resend if configured)
        // await sendAdminNotification(body);

        return NextResponse.json({ success: true, message: "Order pending verification" });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
