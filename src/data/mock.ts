import type { Category, Course, Review } from '@/types'

export const categories: Category[] = [
  { id: 'anatomy', label: 'Human Anatomy', description: 'Systems, structures and clinical landmarks.', count: 18, tone: 'mint' },
  { id: 'nursing', label: 'Clinical Nursing', description: 'Patient care, procedures and communication.', count: 24, tone: 'peach' },
  { id: 'pharmacology', label: 'Pharmacology', description: 'Drug classes, safety and therapeutics.', count: 15, tone: 'lavender' },
  { id: 'public-health', label: 'Public Health', description: 'Prevention, epidemiology and policy.', count: 12, tone: 'sky' },
  { id: 'diagnostics', label: 'Diagnostics', description: 'Imaging, pathology and lab interpretation.', count: 17, tone: 'lemon' },
  { id: 'emergency', label: 'Emergency Care', description: 'Assessment, triage and urgent response.', count: 9, tone: 'rose' },
]

export const courses: Course[] = [
  { id: 1, slug: 'clinical-anatomy-foundations', title: 'Clinical Anatomy Foundations', category: 'Human Anatomy', level: 'Beginner', duration: '6 weeks', lessons: 24, learners: 1840, rating: 4.9, price: 89, accent: 'mint', status: 'Published', instructor: 'Dr. Amara Shah', updated: '18 Oct 2026' },
  { id: 2, slug: 'patient-assessment', title: 'Patient Assessment Essentials', category: 'Clinical Nursing', level: 'Intermediate', duration: '4 weeks', lessons: 18, learners: 1260, rating: 4.8, price: 72, accent: 'peach', status: 'Published', instructor: 'Morgan Lee, RN', updated: '16 Oct 2026' },
  { id: 3, slug: 'safe-medication-practice', title: 'Safe Medication Practice', category: 'Pharmacology', level: 'Intermediate', duration: '5 weeks', lessons: 21, learners: 980, rating: 4.7, price: 79, accent: 'lavender', status: 'Draft', instructor: 'Dr. Imani Cole', updated: '12 Oct 2026' },
  { id: 4, slug: 'epidemiology-in-action', title: 'Epidemiology in Action', category: 'Public Health', level: 'Beginner', duration: '7 weeks', lessons: 28, learners: 2140, rating: 4.9, price: 95, accent: 'sky', status: 'Published', instructor: 'Prof. Jules Moreno', updated: '8 Oct 2026' },
  { id: 5, slug: 'reading-lab-results', title: 'Reading Laboratory Results', category: 'Diagnostics', level: 'Advanced', duration: '3 weeks', lessons: 14, learners: 760, rating: 4.6, price: 68, accent: 'lemon', status: 'Scheduled', instructor: 'Dr. Priya Nwosu', updated: '4 Oct 2026' },
  { id: 6, slug: 'first-response-skills', title: 'First Response Skills', category: 'Emergency Care', level: 'Beginner', duration: '4 weeks', lessons: 16, learners: 1670, rating: 4.8, price: 75, accent: 'rose', status: 'Published', instructor: 'Taylor Brooks, EMT', updated: '2 Oct 2026' },
  { id: 7, slug: 'cardiovascular-physiology', title: 'Cardiovascular Physiology', category: 'Human Anatomy', level: 'Advanced', duration: '6 weeks', lessons: 26, learners: 890, rating: 4.7, price: 92, accent: 'sky', status: 'Draft', instructor: 'Dr. Noah Kim', updated: '28 Sep 2026' },
  { id: 8, slug: 'community-care-planning', title: 'Community Care Planning', category: 'Public Health', level: 'Intermediate', duration: '5 weeks', lessons: 20, learners: 640, rating: 4.6, price: 70, accent: 'mint', status: 'Published', instructor: 'Avery Thompson', updated: '23 Sep 2026' },
]

export const reviews: Review[] = [
  { id: 1, initials: 'NL', author: 'Nadia Lewis', rating: 5, text: 'The clinical examples made difficult anatomy concepts much easier to apply.', date: '14 Oct 2026' },
  { id: 2, initials: 'OS', author: 'Owen Silva', rating: 5, text: 'Clear structure, useful practice checks and excellent downloadable notes.', date: '9 Oct 2026' },
  { id: 3, initials: 'RH', author: 'Rina Hart', rating: 4, text: 'A strong foundation course. The schedule options fit around my placement.', date: '30 Sep 2026' },
]

export const timeSlots = ['08:30', '09:15', '10:00', '11:30', '13:00', '14:45', '16:00', '17:30']
