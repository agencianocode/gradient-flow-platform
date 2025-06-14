
export interface Category {
  id: string
  name: string
  color: string
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface CourseFormData {
  title: string
  description: string
  category_id: string
  level: CourseLevel
  price: number
  duration_hours: number
  thumbnail_url: string
  preview_video_url: string
  requirements: string
  what_you_learn: string
}
