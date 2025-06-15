
-- Actualizar el primer usuario registrado como admin
-- Esto es útil para configuración inicial
UPDATE public.profiles 
SET user_type = 'admin' 
WHERE email = 'hola@agenciadenocode.com';

-- Si ese email no existe, actualizar el primer usuario creado
UPDATE public.profiles 
SET user_type = 'admin' 
WHERE id = (
  SELECT id 
  FROM public.profiles 
  ORDER BY created_at 
  LIMIT 1
) 
AND NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_type = 'admin'
);
