import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge';
import { supabase, supabaseAdmin } from "@/lib/api/supabase";

export async function POST(request: NextRequest) {
    try {
        const { email, password, firstName, lastName, phone } = await request.json();

        // Detect IP Signature
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : "127.0.0.1";

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // --- VALIDATION LAYER ---

        // 1. Phone Number Validation
        if (phone) {
            // Regex: Optional +, then 7-15 digits. Allows spaces/dashes for user comfort but strips them.
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            const phoneRegex = /^\+?[0-9]{7,15}$/;

            if (!phoneRegex.test(cleanPhone)) {
                return NextResponse.json({ error: "Invalid Mobile Number. Please enter a valid international number." }, { status: 400 });
            }
            // Basic detection for "123456" or repeated numbers could go here, but length check helps.
        }

        // 2. Disposable Email Validation
        const disposableDomains = ['tempmail.com', 'throwawaymail.com', 'guerrillamail.com', '10minutemail.com', 'yopmail.com', 'mailinator.com', 'dispostable.com', 'sharklasers.com', 'getnada.com', 'fake-email.com'];
        const emailDomain = email.split('@')[1]?.toLowerCase();

        if (disposableDomains.includes(emailDomain)) {
            return NextResponse.json({ error: "Temporary email addresses are not permitted. Please use a valid permanent email." }, { status: 400 });
        }

        console.log(`[Signup] Attempting registration for: ${email} from IP: ${ip}`);

        // 1. Anti-Fraud Check: Check if IP already exists in the system
        const { data: existingIpUser, error: ipCheckError } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('signup_ip', ip)
            .limit(1)
            .maybeSingle();

        if (existingIpUser) {
            console.warn(`[Signup] Multi-account attempt detected for IP: ${ip}`);
            return NextResponse.json({
                error: "Network Security Alert: Multiple free accounts are not permitted from this node. Free credits are limited to one per device."
            }, { status: 403 });
        }

        // Safety check: is supabaseAdmin configured for auth management?
        if (!supabaseAdmin.auth?.admin) {
            console.error("[Signup] SUPABASE_SERVICE_KEY is missing or invalid. Auth.admin is unavailable.");
            return NextResponse.json({
                error: "Platform Configuration Missing: Please add SUPABASE_SERVICE_KEY to your .env file to enable account creation."
            }, { status: 500 });
        }

        // 2. Create User in Supabase Auth (Triggers Confirmation Email)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            console.error("[Signup] Auth Error:", authError.message);
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        if (!authData.user) {
            return NextResponse.json({ error: "Signup failed to return user data." }, { status: 500 });
        }

        const userId = authData.user.id;
        const user = authData.user;
        console.log(`[Signup] Auth entry created for ${email} with ID: ${userId}`);

        // 3. Sync with public profile & claim free credits (5)
        // We try to update first (in case trigger worked)
        const { data: updatedUser, error: updateError } = await supabaseAdmin
            .from('users')
            .update({
                role: email.includes('admin') ? 'admin' : 'user',
                first_name: firstName,
                last_name: lastName,
                phone: phone || null,
                credits: 5, // Reduced to 5 as requested
                signup_ip: ip
            })
            .eq('id', userId)
            .select()
            .single();

        let finalUser = updatedUser;

        // If update failed because record doesn't exist yet (trigger delay or missing)
        if (updateError || !updatedUser) {
            console.warn("[Signup] Profile not found via update, attempting manual insert...");
            const { data: insertedUser, error: insertError } = await supabaseAdmin
                .from('users')
                .upsert([
                    {
                        id: userId,
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone || null,
                        credits: 5, // Reduced to 5 as requested
                        role: email.includes('admin') ? 'admin' : 'user',
                        subscription_plan: 'free',
                        signup_ip: ip
                    }
                ], { onConflict: 'id' })
                .select()
                .single();

            if (insertError) {
                console.error("[Signup] Database Error:", insertError.message);
                return NextResponse.json({ error: "Auth succeeded but profile creation failed: " + insertError.message }, { status: 500 });
            }
            finalUser = insertedUser;
        }

        console.log(`[Signup] Successfully registered: ${email}`);

        return NextResponse.json({
            success: true,
            requiresConfirmation: !user.email_confirmed_at, // Flag for UI
            user: {
                id: finalUser.id,
                email: finalUser.email,
                role: finalUser.role || 'user'
            }
        });

    } catch (error: any) {
        console.error("[Signup] Critical Failure:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
