import { NextResponse } from 'next/server';
export const runtime = 'edge';
import { getSupabaseAdmin } from '@/lib/api/supabase';

export async function POST(request: Request) {
    try {
        const { userId, first_name, last_name, phone, email } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const updates: any = {
            updated_at: new Date().toISOString(),
        };

        // Only update fields if they are provided (allow partial updates)
        if (first_name !== undefined) updates.first_name = first_name;
        if (last_name !== undefined) updates.last_name = last_name;
        if (phone !== undefined) updates.phone = phone;
        if (email !== undefined) updates.email = email;

        const { error } = await supabaseAdmin
            .from('users')
            .update(updates)
            .eq('id', userId);

        if (error) {
            console.error("Supabase update error:", error);
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
