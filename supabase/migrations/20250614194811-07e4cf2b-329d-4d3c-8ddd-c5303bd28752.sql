
-- Update the user type to admin for the current user
-- This will allow access to the admin panel
UPDATE public.profiles 
SET user_type = 'admin' 
WHERE email = (
  SELECT email 
  FROM auth.users 
  ORDER BY created_at 
  LIMIT 1
);
