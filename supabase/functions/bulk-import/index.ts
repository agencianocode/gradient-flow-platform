
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BulkImportRequest {
  type: 'courses' | 'lessons' | 'categories' | 'users'
  data: any[]
  options?: {
    updateExisting?: boolean
    skipErrors?: boolean
  }
}

interface ImportResult {
  success: boolean
  imported: number
  errors: Array<{ index: number; error: string; data: any }>
  warnings: string[]
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (profile?.user_type !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { type, data, options = {} } = await req.json() as BulkImportRequest

    console.log(`Starting bulk import of ${data.length} ${type} records`)

    const result: ImportResult = {
      success: true,
      imported: 0,
      errors: [],
      warnings: []
    }

    switch (type) {
      case 'categories':
        await importCategories(supabaseClient, data, options, result)
        break
      case 'courses':
        await importCourses(supabaseClient, data, options, result)
        break
      case 'lessons':
        await importLessons(supabaseClient, data, options, result)
        break
      case 'users':
        await importUsers(supabaseClient, data, options, result)
        break
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid import type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    console.log(`Bulk import completed: ${result.imported} imported, ${result.errors.length} errors`)

    return new Response(
      JSON.stringify(result),
      { 
        status: result.errors.length > 0 && !options.skipErrors ? 207 : 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Bulk import error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function importCategories(supabaseClient: any, data: any[], options: any, result: ImportResult) {
  for (let i = 0; i < data.length; i++) {
    const category = data[i]
    try {
      // Validate required fields
      if (!category.name) {
        throw new Error('Category name is required')
      }

      const categoryData = {
        name: category.name,
        description: category.description || null,
        color: category.color || '#6366f1',
        icon: category.icon || null
      }

      let query = supabaseClient.from('categories')

      if (options.updateExisting && category.id) {
        const { error } = await query.upsert(categoryData)
        if (error) throw error
      } else {
        const { error } = await query.insert(categoryData)
        if (error) throw error
      }

      result.imported++
    } catch (error) {
      result.errors.push({
        index: i,
        error: error.message,
        data: category
      })
      if (!options.skipErrors) break
    }
  }
}

async function importCourses(supabaseClient: any, data: any[], options: any, result: ImportResult) {
  for (let i = 0; i < data.length; i++) {
    const course = data[i]
    try {
      // Validate required fields
      if (!course.title) {
        throw new Error('Course title is required')
      }

      if (!course.instructor_id) {
        throw new Error('Instructor ID is required')
      }

      // Verify instructor exists
      const { data: instructor } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('id', course.instructor_id)
        .single()

      if (!instructor) {
        throw new Error('Instructor not found')
      }

      const courseData = {
        title: course.title,
        description: course.description || null,
        instructor_id: course.instructor_id,
        category_id: course.category_id || null,
        level: course.level || 'beginner',
        status: course.status || 'draft',
        price: course.price || 0,
        duration_hours: course.duration_hours || 1,
        thumbnail_url: course.thumbnail_url || null,
        preview_video_url: course.preview_video_url || null,
        requirements: course.requirements || null,
        what_you_learn: course.what_you_learn || null
      }

      let query = supabaseClient.from('courses')

      if (options.updateExisting && course.id) {
        const { error } = await query.upsert({ id: course.id, ...courseData })
        if (error) throw error
      } else {
        const { error } = await query.insert(courseData)
        if (error) throw error
      }

      result.imported++
    } catch (error) {
      result.errors.push({
        index: i,
        error: error.message,
        data: course
      })
      if (!options.skipErrors) break
    }
  }
}

async function importLessons(supabaseClient: any, data: any[], options: any, result: ImportResult) {
  for (let i = 0; i < data.length; i++) {
    const lesson = data[i]
    try {
      // Validate required fields
      if (!lesson.title) {
        throw new Error('Lesson title is required')
      }

      if (!lesson.course_id) {
        throw new Error('Course ID is required')
      }

      // Verify course exists
      const { data: course } = await supabaseClient
        .from('courses')
        .select('id')
        .eq('id', lesson.course_id)
        .single()

      if (!course) {
        throw new Error('Course not found')
      }

      // Get next order index if not provided
      let orderIndex = lesson.order_index
      if (!orderIndex) {
        const { data: lastLesson } = await supabaseClient
          .from('lessons')
          .select('order_index')
          .eq('course_id', lesson.course_id)
          .order('order_index', { ascending: false })
          .limit(1)
          .single()

        orderIndex = (lastLesson?.order_index || 0) + 1
      }

      const lessonData = {
        title: lesson.title,
        description: lesson.description || null,
        content: lesson.content || null,
        course_id: lesson.course_id,
        order_index: orderIndex,
        content_type: lesson.content_type || 'video',
        duration_minutes: lesson.duration_minutes || 0,
        is_preview: lesson.is_preview || false,
        video_url: lesson.video_url || null
      }

      let query = supabaseClient.from('lessons')

      if (options.updateExisting && lesson.id) {
        const { error } = await query.upsert({ id: lesson.id, ...lessonData })
        if (error) throw error
      } else {
        const { error } = await query.insert(lessonData)
        if (error) throw error
      }

      result.imported++
    } catch (error) {
      result.errors.push({
        index: i,
        error: error.message,
        data: lesson
      })
      if (!options.skipErrors) break
    }
  }
}

async function importUsers(supabaseClient: any, data: any[], options: any, result: ImportResult) {
  for (let i = 0; i < data.length; i++) {
    const user = data[i]
    try {
      // Validate required fields
      if (!user.email) {
        throw new Error('User email is required')
      }

      if (!user.password) {
        throw new Error('User password is required')
      }

      // Create auth user
      const { data: authUser, error: authError } = await supabaseClient.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          full_name: user.full_name || 'Usuario'
        }
      })

      if (authError) throw authError

      // Create profile
      const profileData = {
        id: authUser.user.id,
        email: user.email,
        full_name: user.full_name || 'Usuario',
        user_type: user.user_type || 'student',
        bio: user.bio || null,
        avatar_url: user.avatar_url || null,
        location: user.location || null,
        website: user.website || null
      }

      const { error: profileError } = await supabaseClient
        .from('profiles')
        .upsert(profileData)

      if (profileError) throw profileError

      result.imported++
    } catch (error) {
      result.errors.push({
        index: i,
        error: error.message,
        data: { ...user, password: '[REDACTED]' }
      })
      if (!options.skipErrors) break
    }
  }
}
