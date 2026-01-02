import { createClient } from '@supabase/supabase-js';

// Helper to get fresh env vars (important for Edge runtime)
const getEnv = (key: string) => process.env[key] || '';

// Client for client-side operations (public/anon key)
// We use a singleton pattern but initialize lazily to avoid build-time errors
let supabaseInstance: any = null;

export const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;

    const url = getEnv('SUPABASE_URL');
    const key = getEnv('SUPABASE_ANON_KEY');

    if (!url || !key) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Supabase URL or Key missing');
        }
        // Return a dummy client or throw, but better to checking calling code
        // However, throwing here might still break build if called globally.
        // We'll trust the caller to handle errors or we throw deeply.
    }

    supabaseInstance = createClient(url, key);
    return supabaseInstance;
};

// Admin client (server-side only)
export const getSupabaseAdmin = () => {
    const url = getEnv('SUPABASE_URL');
    const serviceKey = getEnv('SUPABASE_SERVICE_KEY');
    const anonKey = getEnv('SUPABASE_ANON_KEY');

    // Fallback to anon key if service key missing (though permissions might fail)
    return createClient(url, serviceKey || anonKey);
};

// Keep direct exports for backward compatibility if safe, 
// BUT for the build error fix, we should prefer the functions.
// We'll wrap the current exports to use the lazy loader if accessed.

export const supabase = {
    get from() { return getSupabase().from },
    get storage() { return getSupabase().storage },
    get auth() { return getSupabase().auth },
};

export const supabaseAdmin = {
    get from() { return getSupabaseAdmin().from },
    get storage() { return getSupabaseAdmin().storage },
    get auth() { return getSupabaseAdmin().auth },
    get rpc() { return getSupabaseAdmin().rpc },
};

export const isSupabaseConfigured = () => {
    return !!getEnv('SUPABASE_URL') && !!getEnv('SUPABASE_ANON_KEY');
};
