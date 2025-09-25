-- Fix RLS policy to allow API inserts
-- Run this in your Supabase SQL Editor

-- Option 1: Drop the existing policy and create a more permissive one
DROP POLICY IF EXISTS "Allow inserts for leads" ON leads;

-- Create new policy that allows all inserts (service role bypasses RLS anyway)
CREATE POLICY "Allow inserts for leads" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Option 2: Alternative - Disable RLS entirely for leads table (if above doesn't work)
-- ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
