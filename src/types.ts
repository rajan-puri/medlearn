export type CourseStatus = 'Published' | 'Draft' | 'Scheduled'

export interface Course {
  id: number
  slug: string
  title: string
  category: string
  level: string
  duration: string
  lessons: number
  learners: number
  rating: number
  price: number
  accent: string
  status: CourseStatus
  instructor: string
  updated: string
}

export interface Category {
  id: string
  label: string
  description: string
  count: number
  tone: string
}

export interface Review {
  id: number
  initials: string
  author: string
  rating: number
  text: string
  date: string
}
