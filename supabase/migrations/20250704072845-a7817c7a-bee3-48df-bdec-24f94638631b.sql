
-- Make school_name and pincode nullable to prevent insertion failures
-- These fields are not always required for all user types
ALTER TABLE public.user_demographics 
ALTER COLUMN school_name DROP NOT NULL,
ALTER COLUMN pincode DROP NOT NULL;

-- Also make sure the RLS policies allow users to insert their own data
-- (checking if the policy exists and is correct)
DO $$
BEGIN
    -- Check if the insert policy exists and recreate it if needed
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_demographics' 
        AND policyname = 'Users can insert their own demographics'
    ) THEN
        CREATE POLICY "Users can insert their own demographics" 
        ON public.user_demographics 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;
