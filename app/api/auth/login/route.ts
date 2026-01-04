
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/api/supabase";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // --- HARDCODED ADMIN CHECK ---
        // As requested by the user: "create user and pass for me and i will login with them to my admin dashboard"
        const ADMIN_EMAIL = "admin@fsmvid.com";
        const ADMIN_PASS = "admin789"; // User can change this here

        if (email === ADMIN_EMAIL) {
            if (password === ADMIN_PASS) {
                // Fetch the admin user record from the DB
                let { data: dbAdmin } = await supabaseAdmin
                    .from('users')
                    .select('*')
                    .eq('email', ADMIN_EMAIL)
                    .single();

                // if admin record doesn't exist in public.users, create it on the fly
                if (!dbAdmin) {
                    console.log("[Auth] Seeding admin record for:", ADMIN_EMAIL);
                    const { data: newAdmin, error: seedError } = await supabaseAdmin
                        .from('users')
                        .insert([{
                            id: '00000000-0000-0000-0000-000000000000',
                            email: ADMIN_EMAIL,
                            role: 'admin',
                            credits: 9999,
                            subscription_plan: 'premium'
                        }])
                        .select()
                        .single();

                    if (seedError) console.error("[Auth] Seed Error:", seedError.message);
                    dbAdmin = newAdmin;
                }

                return NextResponse.json({
                    success: true,
                    user: {
                        id: dbAdmin?.id || '00000000-0000-0000-0000-000000000000',
                        email: ADMIN_EMAIL,
                        role: 'admin'
                    }
                });
            } else {
                return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
            }
        }

        // --- NORMAL USER CHECK ---
        // We use the auth client to verify the password securely.
        const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password
        });

        if (authError || !authData.user) {
            return NextResponse.json({ error: authError?.message || "Invalid credentials" }, { status: 401 });
        }

        // Fetch the profile role
        const { data: userProfile } = await supabaseAdmin
            .from('users')
            .select('role')
            .eq('id', authData.user.id)
            .single();

        return NextResponse.json({
            success: true,
            user: {
                id: authData.user.id,
                email: authData.user.email,
                role: userProfile?.role || 'user'
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
