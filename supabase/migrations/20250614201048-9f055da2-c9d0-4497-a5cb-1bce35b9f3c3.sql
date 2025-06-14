
-- Create storage buckets for course files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('course-thumbnails', 'course-thumbnails', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('course-videos', 'course-videos', true, 524288000, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('course-materials', 'course-materials', true, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']);

-- Create RLS policies for course-thumbnails bucket
CREATE POLICY "Anyone can view course thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Authenticated users can upload course thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'course-thumbnails' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own course thumbnails" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'course-thumbnails' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own course thumbnails" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'course-thumbnails' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create RLS policies for course-videos bucket
CREATE POLICY "Anyone can view course videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-videos');

CREATE POLICY "Authenticated users can upload course videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'course-videos' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own course videos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'course-videos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own course videos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'course-videos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create RLS policies for course-materials bucket
CREATE POLICY "Anyone can view course materials" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-materials');

CREATE POLICY "Authenticated users can upload course materials" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'course-materials' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own course materials" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'course-materials' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own course materials" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'course-materials' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
