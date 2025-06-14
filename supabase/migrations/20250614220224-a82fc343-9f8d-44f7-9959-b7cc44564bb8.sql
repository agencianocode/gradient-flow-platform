
-- Función para actualizar el conteo de lecciones en un curso
CREATE OR REPLACE FUNCTION update_course_lesson_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE courses 
    SET total_lessons = (
      SELECT COUNT(*) FROM lessons WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses 
    SET total_lessons = (
      SELECT COUNT(*) FROM lessons WHERE course_id = OLD.course_id
    )
    WHERE id = OLD.course_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar conteo de lecciones
CREATE TRIGGER trigger_update_course_lesson_count
  AFTER INSERT OR DELETE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_lesson_count();

-- Función para calcular duración total del curso
CREATE OR REPLACE FUNCTION update_course_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE courses 
    SET duration_hours = GREATEST(1, ROUND((
      SELECT COALESCE(SUM(duration_minutes), 0) FROM lessons WHERE course_id = NEW.course_id
    ) / 60.0))
    WHERE id = NEW.course_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses 
    SET duration_hours = GREATEST(1, ROUND((
      SELECT COALESCE(SUM(duration_minutes), 0) FROM lessons WHERE course_id = OLD.course_id
    ) / 60.0))
    WHERE id = OLD.course_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar duración del curso
CREATE TRIGGER trigger_update_course_duration
  AFTER INSERT OR UPDATE OR DELETE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_duration();

-- Función para validar orden de lecciones
CREATE OR REPLACE FUNCTION validate_lesson_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar que el order_index sea positivo
  IF NEW.order_index < 1 THEN
    RAISE EXCEPTION 'El índice de orden debe ser mayor a 0';
  END IF;

  -- Verificar que no haya duplicados en el mismo curso
  IF EXISTS (
    SELECT 1 FROM lessons 
    WHERE course_id = NEW.course_id 
    AND order_index = NEW.order_index 
    AND id != COALESCE(NEW.id, gen_random_uuid())
  ) THEN
    RAISE EXCEPTION 'Ya existe una lección con este orden en el curso';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar orden de lecciones
CREATE TRIGGER trigger_validate_lesson_order
  BEFORE INSERT OR UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION validate_lesson_order();

-- Función para validar precios de cursos
CREATE OR REPLACE FUNCTION validate_course_price()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar que el precio no sea negativo
  IF NEW.price < 0 THEN
    RAISE EXCEPTION 'El precio del curso no puede ser negativo';
  END IF;

  -- Verificar que la duración sea positiva
  IF NEW.duration_hours < 1 THEN
    RAISE EXCEPTION 'La duración del curso debe ser al menos 1 hora';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar precios de cursos
CREATE TRIGGER trigger_validate_course_price
  BEFORE INSERT OR UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION validate_course_price();

-- Función para actualizar conteo de estudiantes en inscripciones
CREATE OR REPLACE FUNCTION update_course_student_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE courses 
    SET total_students = (
      SELECT COUNT(*) FROM enrollments WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses 
    SET total_students = (
      SELECT COUNT(*) FROM enrollments WHERE course_id = OLD.course_id
    )
    WHERE id = OLD.course_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar conteo de estudiantes
CREATE TRIGGER trigger_update_course_student_count
  AFTER INSERT OR DELETE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_course_student_count();

-- Función para validar fechas de eventos
CREATE OR REPLACE FUNCTION validate_event_date()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar que la fecha del evento no sea en el pasado
  IF NEW.event_date < NOW() THEN
    RAISE EXCEPTION 'La fecha del evento no puede ser en el pasado';
  END IF;

  -- Verificar que la duración sea positiva
  IF NEW.duration_minutes < 1 THEN
    RAISE EXCEPTION 'La duración del evento debe ser al menos 1 minuto';
  END IF;

  -- Verificar que el máximo de asistentes sea positivo si se especifica
  IF NEW.max_attendees IS NOT NULL AND NEW.max_attendees < 1 THEN
    RAISE EXCEPTION 'El máximo de asistentes debe ser mayor a 0';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar fechas de eventos
CREATE TRIGGER trigger_validate_event_date
  BEFORE INSERT OR UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION validate_event_date();

-- Función para actualizar conteo de asistentes a eventos
CREATE OR REPLACE FUNCTION update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_attendees = (
      SELECT COUNT(*) FROM event_registrations WHERE event_id = NEW.event_id
    )
    WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_attendees = (
      SELECT COUNT(*) FROM event_registrations WHERE event_id = OLD.event_id
    )
    WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar conteo de asistentes
CREATE TRIGGER trigger_update_event_attendee_count
  AFTER INSERT OR DELETE ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_attendee_count();

-- Función para validar capacidad máxima de eventos
CREATE OR REPLACE FUNCTION validate_event_capacity()
RETURNS TRIGGER AS $$
DECLARE
  event_max_attendees INTEGER;
  current_count INTEGER;
BEGIN
  -- Obtener la capacidad máxima del evento
  SELECT max_attendees INTO event_max_attendees
  FROM events WHERE id = NEW.event_id;

  -- Si no hay límite, permitir la inscripción
  IF event_max_attendees IS NULL THEN
    RETURN NEW;
  END IF;

  -- Contar inscripciones actuales
  SELECT COUNT(*) INTO current_count
  FROM event_registrations WHERE event_id = NEW.event_id;

  -- Verificar si se excede la capacidad
  IF current_count >= event_max_attendees THEN
    RAISE EXCEPTION 'El evento ha alcanzado su capacidad máxima de % asistentes', event_max_attendees;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar capacidad de eventos
CREATE TRIGGER trigger_validate_event_capacity
  BEFORE INSERT ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION validate_event_capacity();

-- Función para actualizar progreso de inscripción
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  new_progress DECIMAL(5,2);
BEGIN
  -- Obtener total de lecciones del curso
  SELECT COUNT(*) INTO total_lessons
  FROM lessons WHERE course_id = (
    SELECT course_id FROM lessons WHERE id = NEW.lesson_id
  );

  -- Contar lecciones completadas por el usuario
  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_progress lp
  JOIN lessons l ON lp.lesson_id = l.id
  WHERE lp.user_id = NEW.user_id 
  AND l.course_id = (SELECT course_id FROM lessons WHERE id = NEW.lesson_id)
  AND lp.is_completed = true;

  -- Calcular nuevo progreso
  IF total_lessons > 0 THEN
    new_progress := (completed_lessons::DECIMAL / total_lessons::DECIMAL) * 100;
  ELSE
    new_progress := 0;
  END IF;

  -- Actualizar progreso en enrollments
  UPDATE enrollments 
  SET 
    progress_percentage = new_progress,
    completed_lessons = completed_lessons,
    last_accessed_at = NOW(),
    completed_at = CASE WHEN new_progress = 100 THEN NOW() ELSE NULL END
  WHERE user_id = NEW.user_id 
  AND course_id = (SELECT course_id FROM lessons WHERE id = NEW.lesson_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar progreso cuando se completa una lección
CREATE TRIGGER trigger_update_enrollment_progress
  AFTER UPDATE ON lesson_progress
  FOR EACH ROW
  WHEN (NEW.is_completed = true AND OLD.is_completed = false)
  EXECUTE FUNCTION update_enrollment_progress();
