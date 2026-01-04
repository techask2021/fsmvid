
import { createClient } from '@supabase/supabase-js';

// Helper to get fresh env vars (important for Edge runtime)
const getEnv = (key: string) => {
    // Check for NEXT_PUBLIC_ version (required for browser/client-side)
    // If the user hasn't added NEXT_PUBLIC_ to their .env, this will be undefined in the browser.
    const publicVal = process.env[`NEXT_PUBLIC_${key}`];
    if (publicVal) return publicVal;

    // Fallback to standard key (only works on SERVER-SIDE)
    return process.env[key] || '';
};

let supabaseInstance: any = null;
let supabaseAdminInstance: any = null;

export const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;

    const url = getEnv('SUPABASE_URL');
    const key = getEnv('SUPABASE_ANON_KEY');

    // We only error if we are on the server or if we really need it.
    // On the client, we might not have these yet if the user didn't prefix them.
    if (!url || !key) {
        if (typeof window !== 'undefined') {
            console.warn('⚠️ Supabase client-side config missing. Ensure NEXT_PUBLIC_SUPABASE_URL is in .env');
            return null; // Return null instead of breaking
        }
        return null;
    }

    supabaseInstance = createClient(url, key);
    return supabaseInstance;
};

export const getSupabaseAdmin = () => {
    if (supabaseAdminInstance) return supabaseAdminInstance;

    const url = getEnv('SUPABASE_URL');
    const serviceKey = getEnv('SUPABASE_SERVICE_KEY');
    const anonKey = getEnv('SUPABASE_ANON_KEY');

    if (!url) return null;

    const key = serviceKey || anonKey;
    if (!key) return null;

    supabaseAdminInstance = createClient(url, key);
    return supabaseAdminInstance;
};

/**
 * Proxy helper to allow lazy initialization with proper 'this' binding.
 */
const createLazyProxy = (clientGetter: () => any) => {
    return new Proxy({} as any, {
        get(target, prop) {
            const client = clientGetter();
            if (!client) {
                // If it's a critical call, we throw a descriptive error
                if (prop === 'from' || prop === 'auth' || prop === 'rpc') {
                    const msg = typeof window !== 'undefined'
                        ? "Supabase Config Missing: Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file."
                        : "Supabase Config Missing: Please add SUPABASE_URL and SUPABASE_SERVICE_KEY to your .env file.";
                    throw new Error(msg);
                }
                return undefined;
            }
            const value = client[prop];
            if (typeof value === 'function') {
                return value.bind(client);
            }
            return value;
        }
    });
};

export const supabase = createLazyProxy(getSupabase);
export const supabaseAdmin = createLazyProxy(getSupabaseAdmin);

export const isSupabaseConfigured = () => {
    return !!getEnv('SUPABASE_URL') && (!!getEnv('SUPABASE_ANON_KEY') || !!getEnv('SUPABASE_SERVICE_KEY'));
};
