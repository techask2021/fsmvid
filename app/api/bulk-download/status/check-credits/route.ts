import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    try {
        const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('credits')
            .eq('id', userId)
            .maybeSingle();

        if (error) throw error;

        return NextResponse.json({
            credits: user ? user.credits : 0
        });

    } catch (error: any) {
        console.error("Fetch credits error:", error);
        return NextResponse.json({ credits: 0 }, { status: 200 }); // Graceful fallback
    }
}
