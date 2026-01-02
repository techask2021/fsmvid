-- 1. PAYMENT ORDERS TABLE
-- Stores the transaction history for manual payments
CREATE TABLE IF NOT EXISTS public.payment_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  
  -- Order Details
  plan_id TEXT NOT NULL, -- 'basic', 'pro', 'premium' (matched to PLANS constant)
  amount DECIMAL(10, 2) NOT NULL, -- e.g. 9.99
  currency TEXT DEFAULT 'USDT',
  
  -- Provider Info
  provider TEXT DEFAULT 'binance_manual', -- 'binance_manual', 'stripe', etc.
  tx_hash TEXT NOT NULL, -- The Transaction ID submitted by the user
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_note TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders" 
  ON public.payment_orders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" 
  ON public.payment_orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 2. ADMIN FUNCTION: Approve Payment & Add Credits
-- This helper allows you (the admin) to easily approve a transaction
CREATE OR REPLACE FUNCTION approve_payment_order(order_id UUID, credits_to_add INTEGER)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_status TEXT;
BEGIN
  -- Check current status with lock
  SELECT user_id, status INTO v_user_id, v_status 
  FROM public.payment_orders 
  WHERE id = order_id 
  FOR UPDATE;
  
  IF v_status != 'pending' THEN
    RAISE EXCEPTION 'Order is not pending';
  END IF;
  
  -- 1. Update Order Status
  UPDATE public.payment_orders 
  SET status = 'approved',
      updated_at = NOW()
  WHERE id = order_id;
  
  -- 2. Add Credits to User
  UPDATE public.users
  SET credits = credits + credits_to_add,
      updated_at = NOW()
  WHERE id = v_user_id;
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. ADMIN FUNCTION: Reject Payment
CREATE OR REPLACE FUNCTION reject_payment_order(order_id UUID, reason TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.payment_orders 
  SET status = 'rejected',
      admin_note = reason,
      updated_at = NOW()
  WHERE id = order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
