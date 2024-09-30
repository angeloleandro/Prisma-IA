DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'profiles' 
                   AND column_name = 'is_pro') THEN
        ALTER TABLE public.profiles
        ADD COLUMN is_pro BOOLEAN DEFAULT false;

        COMMENT ON COLUMN public.profiles.is_pro IS 'Indica se o usuário tem status Pro';
    ELSE
        RAISE NOTICE 'Column is_pro already exists in profiles table';
    END IF;
END $$;