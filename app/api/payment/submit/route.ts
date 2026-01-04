
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";
import { Resend } from "resend";

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

        // Send Admin Email Notification
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: "support@fsmvid.com",
                    to: "amtrip2020@gmail.com",
                    subject: `💰 New Payment Submission: ${plan} ($${amount})`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2 style="color: #2563eb;">New Manual Payment Pending</h2>
                            <p>A user has submitted a new payment transaction for verification.</p>
                            <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
                                <p style="margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
                                <p style="margin: 5px 0;"><strong>Plan:</strong> ${plan}</p>
                                <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount}</p>
                                <p style="margin: 5px 0;"><strong>TX Hash:</strong> <code style="background: #fff; padding: 4px 8px; border-radius: 4px;">${txHash}</code></p>
                            </div>
                            <p>Please verify this transaction in your Binance account and then approve it in the <a href="https://fsmvid.com/admin" style="color: #2563eb;">Admin Dashboard</a>.</p>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error("Failed to send admin notification:", emailError);
            }
        }

        return NextResponse.json({ success: true, message: "Order pending verification" });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
