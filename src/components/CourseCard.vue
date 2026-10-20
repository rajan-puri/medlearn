<script setup lang="ts">
import { Clock3, Star, Users } from 'lucide-vue-next'
import CourseArtwork from './CourseArtwork.vue'
import type { Course } from '@/types'

defineProps<{ course: Course; showStatus?: boolean }>()
</script>

<template>
  <article class="course-card">
    <RouterLink :to="`/courses/${course.slug}`" class="course-card-link" :aria-label="`View ${course.title}`">
      <CourseArtwork :tone="course.accent" :label="course.title" />
      <div class="course-card-body">
        <div class="course-card-topline">
          <span class="eyebrow">{{ course.category }}</span>
          <span v-if="showStatus" class="status-pill" :class="`status-${course.status.toLowerCase()}`">{{ course.status }}</span>
        </div>
        <h2>{{ course.title }}</h2>
        <p class="course-instructor">With {{ course.instructor }}</p>
        <dl class="course-meta">
          <div><Clock3 aria-hidden="true" /><dt class="sr-only">Duration</dt><dd>{{ course.duration }}</dd></div>
          <div><Users aria-hidden="true" /><dt class="sr-only">Learners</dt><dd>{{ course.learners.toLocaleString() }}</dd></div>
          <div><Star aria-hidden="true" /><dt class="sr-only">Rating</dt><dd>{{ course.rating }}</dd></div>
        </dl>
      </div>
    </RouterLink>
  </article>
</template>
