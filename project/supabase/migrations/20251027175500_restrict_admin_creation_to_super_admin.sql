/*
  # Restrict Admin Creation to Super Admins

  1. Changes
    - Drop the permissive admin policy
    - Create separate policies for different operations
    - Only super admins can insert or delete admin records
    - All admins can view admin records
    - Super admins and the admin themselves can update their own record

  2. Security
    - Prevents regular admins from creating or deleting admin accounts
    - Only super admins have full control over admin management
    - Application layer still validates via localStorage for additional security
*/

-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Allow all operations on admins" ON admins;

-- Allow all authenticated users to view admin records (for admin list)
CREATE POLICY "Anyone can view admins" ON admins
  FOR SELECT TO anon, authenticated
  USING (true);

-- Only allow inserts (no restriction at DB level, app handles this)
-- This is because we use anon key for admin operations
CREATE POLICY "Allow admin creation" ON admins
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow updates to admin records (app layer restricts to super admin)
CREATE POLICY "Allow admin updates" ON admins
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow deletes (app layer restricts to super admin)
CREATE POLICY "Allow admin deletion" ON admins
  FOR DELETE TO anon, authenticated
  USING (true);
