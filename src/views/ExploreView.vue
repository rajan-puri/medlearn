<script setup lang="ts">
import { computed, ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import CourseCard from '@/components/CourseCard.vue'
import WorkspaceHeader from '@/components/WorkspaceHeader.vue'
import { categories, courses } from '@/data/mock'

const sidebarCollapsed = ref(false)
const selectedCategory = ref('All courses')

const filteredCourses = computed(() => selectedCategory.value === 'All courses'
  ? courses
  : courses.filter((course) => course.category === selectedCategory.value))
</script>

<template>
  <div class="workspace-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <AppSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="workspace-main">
      <WorkspaceHeader label="Learner workspace" />
      <main id="main-content" class="workspace-content">
        <header class="page-heading">
          <div><p class="eyebrow">Course library</p><h1 tabindex="-1">Explore courses</h1><p>Build practical skills with focused health science courses.</p></div>
          <span class="result-count" aria-live="polite">{{ filteredCourses.length }} courses</span>
        </header>
        <div class="filter-row" role="group" aria-label="Filter courses by category">
          <button type="button" class="filter-chip" :aria-pressed="selectedCategory === 'All courses'" @click="selectedCategory = 'All courses'">All courses</button>
          <button v-for="category in categories" :key="category.id" type="button" class="filter-chip" :aria-pressed="selectedCategory === category.label" @click="selectedCategory = category.label">{{ category.label }}</button>
        </div>
        <div class="course-grid explore-grid">
          <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
        </div>
      </main>
    </div>
  </div>
</template>
