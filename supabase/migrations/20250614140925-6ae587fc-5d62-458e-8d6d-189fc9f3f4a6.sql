
-- Crear enum para tipos de usuario
CREATE TYPE user_type AS ENUM ('student', 'instructor', 'admin');

-- Crear enum para niveles de curso
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Crear enum para estados de curso
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');

-- Crear enum para tipos de contenido
CREATE TYPE content_type AS ENUM ('video', 'text', 'quiz', 'assignment');

-- Crear enum para estados de evento
CREATE TYPE event_status AS ENUM ('upcoming', 'live', 'completed', 'cancelled');

-- Crear enum para tipos de post de comunidad
CREATE TYPE post_type AS ENUM ('discussion', 'question', 'announcement');

-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  user_type user_type DEFAULT 'student',
  location TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de categorías de cursos
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de cursos
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  level course_level DEFAULT 'beginner',
  status course_status DEFAULT 'draft',
  price DECIMAL(10,2) DEFAULT 0,
  duration_hours INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  preview_video_url TEXT,
  requirements TEXT[],
  what_you_learn TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de lecciones
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type content_type DEFAULT 'video',
  video_url TEXT,
  content TEXT,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de inscripciones a cursos
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Tabla de progreso por lección
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  watch_time_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Tabla de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  status event_status DEFAULT 'upcoming',
  meeting_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de registros a eventos
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attended BOOLEAN DEFAULT false,
  UNIQUE(user_id, event_id)
);

-- Tabla de posts de comunidad
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type post_type DEFAULT 'discussion',
  category_id UUID REFERENCES categories(id),
  is_pinned BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de comentarios
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de likes para posts
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Tabla de likes para comentarios
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, comment_id)
);

-- Tabla de notificaciones
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Usuario')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Habilitar Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para courses
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (status = 'published');
CREATE POLICY "Instructors can manage own courses" ON courses FOR ALL USING (auth.uid() = instructor_id);

-- Políticas RLS para lessons
CREATE POLICY "Anyone can view lessons of published courses" ON lessons 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM courses 
    WHERE courses.id = lessons.course_id 
    AND courses.status = 'published'
  )
);

-- Políticas RLS para enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own enrollments" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollments" ON enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para lesson_progress
CREATE POLICY "Users can manage own lesson progress" ON lesson_progress FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para events
CREATE POLICY "Anyone can view upcoming events" ON events FOR SELECT USING (status = 'upcoming' OR status = 'live');

-- Políticas RLS para event_registrations
CREATE POLICY "Users can manage own event registrations" ON event_registrations FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para community_posts
CREATE POLICY "Anyone can view community posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON community_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON community_posts FOR DELETE USING (auth.uid() = author_id);

-- Políticas RLS para comments
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = author_id);

-- Políticas RLS para likes
CREATE POLICY "Users can manage own post likes" ON post_likes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own comment likes" ON comment_likes FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insertar categorías iniciales
INSERT INTO categories (name, description, icon, color) VALUES
('No Code', 'Desarrollo sin código', 'Code', '#8B5CF6'),
('Automatización', 'Automatización de procesos', 'Zap', '#06B6D4'),
('Diseño Web', 'Diseño y desarrollo web', 'Palette', '#EC4899'),
('Bases de Datos', 'Gestión de bases de datos', 'Database', '#10B981'),
('Productividad', 'Herramientas de productividad', 'Rocket', '#F59E0B'),
('E-commerce', 'Comercio electrónico', 'ShoppingCart', '#EF4444');
