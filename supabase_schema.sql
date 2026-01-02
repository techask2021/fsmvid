-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Extends Supabase Auth)
-- This table stores profile data linked to auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  credits INTEGER DEFAULT 10, -- Start with 10 free credits
  subscription_plan TEXT DEFAULT 'free', -- free, basic, pro, premium
  subscription_status TEXT DEFAULT 'active',
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Trigger to create a public.users entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, credits, subscription_plan)
  VALUES (new.id, new.email, 10, 'free');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. BULK DOWNLOAD JOBS TABLE
CREATE TABLE IF NOT EXISTS public.bulk_download_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  
  -- Job Details
  urls TEXT[] NOT NULL, -- Array of URLs to process
  total_files INTEGER NOT NULL,
  quality_preference TEXT DEFAULT 'auto', -- auto, best, 1080p, etc.
  format_preference TEXT DEFAULT 'mp4', -- mp4, mp3
  
  -- Request Metadata
  platform TEXT, -- dominant platform if any
  
  -- Status Tracking
  status TEXT DEFAULT 'queued', -- queued, processing, completed, failed
  progress INTEGER DEFAULT 0, -- 0 to 100
  current_file INTEGER DEFAULT 0,
  completed_files INTEGER DEFAULT 0,
  failed_files INTEGER DEFAULT 0,
  
  -- Results (Supabase Storage)
  zip_storage_path TEXT,
  zip_download_url TEXT,
  zip_size_bytes BIGINT,
  zip_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- System Info
  credits_used INTEGER DEFAULT 0,
  error_message TEXT,
  failed_urls TEXT[],
  
  -- Timestamps
  processing_started_at TIMESTAMP WITH TIME ZONE,
  processing_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helper function to update 'updated_at' automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bulk_download_jobs_updated_at
BEFORE UPDATE ON public.bulk_download_jobs
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.bulk_download_jobs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own jobs" 
  ON public.bulk_download_jobs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create jobs" 
  ON public.bulk_download_jobs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
  
-- Note: Updates usually handled by service role (backend), but user might need to cancel?
-- For now, keep updates restricted or service-role only.


-- 3. RPC FUNCTION: Deduct Credits Safely
-- This function runs atomically to prevent race conditions
CREATE OR REPLACE FUNCTION deduct_credits(user_id UUID, amount INTEGER)
RETURNS VOID AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits with row lock
  SELECT credits INTO current_credits FROM public.users WHERE id = user_id FOR UPDATE;
  
  IF current_credits < amount THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
  
  -- Update credits
  UPDATE public.users 
  SET credits = credits - amount,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 4. STORAGE SETUP (Must be done in Supabase Dashboard usually, but here is the logic)
-- Create a bucket named 'downloads'
-- insert into storage.buckets (id, name, public) values ('downloads', 'downloads', false);

-- Policy to allow users to read their own files (via signed URLs mostly, but good to have)
-- ... (Storage policies are often complex to script purely via SQL editor depending on permissions)
