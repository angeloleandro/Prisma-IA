ALTER TABLE public.profiles
ADD COLUMN is_pro BOOLEAN DEFAULT false;

-- Adicione um comentário para documentar a coluna
COMMENT ON COLUMN public.profiles.is_pro IS 'Indica se o usuário tem status Pro';