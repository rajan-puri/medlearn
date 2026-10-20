<script setup lang="ts">
import { Grid2X2, List, Plus, X } from 'lucide-vue-next'
import { computed, nextTick, reactive, ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import BaseModal from '@/components/BaseModal.vue'
import CourseCard from '@/components/CourseCard.vue'
import WorkspaceHeader from '@/components/WorkspaceHeader.vue'
import { courses } from '@/data/mock'

const sidebarCollapsed = ref(false)
const activeCategory = ref('All')
const viewMode = ref<'grid' | 'list'>('grid')
const modalOpen = ref(false)
const toastVisible = ref(false)
const errorSummary = ref<HTMLElement | null>(null)

const form = reactive({ title: '', category: '', description: '', price: '' })
const errors = reactive<Record<'title' | 'category' | 'description' | 'price', string>>({ title: '', category: '', description: '', price: '' })
const tabs = ['All', 'Published', 'Draft', 'Scheduled'] as const

const visibleCourses = computed(() => activeCategory.value === 'All' ? courses : courses.filter((course) => course.status === activeCategory.value))

function validate(): boolean {
  errors.title = form.title.trim().length >= 4 ? '' : 'Enter a course title with at least 4 characters.'
  errors.category = form.category ? '' : 'Choose a course category.'
  errors.description = form.description.trim().length >= 20 ? '' : 'Enter a description with at least 20 characters.'
  const numericPrice = Number(form.price)
  errors.price = form.price && numericPrice >= 0 ? '' : 'Enter a valid price of 0 or more.'
  return !Object.values(errors).some(Boolean)
}

async function submit(): Promise<void> {
  if (!validate()) {
    await nextTick()
    errorSummary.value?.focus()
    return
  }
  modalOpen.value = false
  toastVisible.value = true
  Object.assign(form, { title: '', category: '', description: '', price: '' })
  window.setTimeout(() => { toastVisible.value = false }, 4500)
}

function closeModal(): void {
  modalOpen.value = false
}

function focusField(field: string): void {
  document.getElementById(`course-${field}`)?.focus()
}
</script>

<template>
  <div class="workspace-layout manage-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <AppSidebar mode="instructor" :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="workspace-main">
      <WorkspaceHeader label="Instructor workspace" />
      <main id="main-content" class="workspace-content">
        <header class="page-heading manage-heading">
          <div><p class="eyebrow">Instructor portal</p><h1 tabindex="-1">Courses</h1><p>Create and manage your health science course catalogue.</p></div>
          <button class="button button-primary" type="button" @click="modalOpen = true"><Plus aria-hidden="true" /> New course</button>
        </header>
        <div class="manage-toolbar">
          <div class="category-tabs" role="tablist" aria-label="Filter managed courses">
            <button v-for="tab in tabs" :key="tab" role="tab" type="button" :aria-selected="activeCategory === tab" @click="activeCategory = tab">{{ tab }}</button>
          </div>
          <div class="view-toggle" role="group" aria-label="Course layout">
            <button type="button" :aria-pressed="viewMode === 'grid'" aria-label="Grid view" @click="viewMode = 'grid'"><Grid2X2 aria-hidden="true" /></button>
            <button type="button" :aria-pressed="viewMode === 'list'" aria-label="List view" @click="viewMode = 'list'"><List aria-hidden="true" /></button>
          </div>
        </div>
        <div class="course-grid manage-grid" :class="{ 'list-view': viewMode === 'list' }">
          <CourseCard v-for="course in visibleCourses" :key="course.id" :course="course" show-status />
        </div>
      </main>
    </div>
  </div>

  <BaseModal :open="modalOpen" title="Create a new course" description="Add the core course details. You can add lessons after saving." @close="closeModal">
    <form class="course-form" novalidate @submit.prevent="submit">
      <div v-if="Object.values(errors).some(Boolean)" ref="errorSummary" class="error-summary" role="alert" tabindex="-1" aria-labelledby="error-summary-title">
        <h3 id="error-summary-title">There is a problem</h3>
        <ul><li v-for="(error, field) in errors" v-show="error" :key="field"><a :href="`#course-${field}`" @click.prevent="focusField(field)">{{ error }}</a></li></ul>
      </div>
      <div class="field">
        <label for="course-title">Course title <span aria-hidden="true">*</span></label>
        <input id="course-title" v-model.trim="form.title" type="text" autocomplete="off" :aria-invalid="Boolean(errors.title)" :aria-describedby="errors.title ? 'course-title-error' : 'course-title-help'" />
        <p v-if="errors.title" id="course-title-error" class="field-error">{{ errors.title }}</p><p v-else id="course-title-help" class="field-help">Use a short, specific title.</p>
      </div>
      <div class="field">
        <label for="course-category">Category <span aria-hidden="true">*</span></label>
        <select id="course-category" v-model="form.category" :aria-invalid="Boolean(errors.category)" :aria-describedby="errors.category ? 'course-category-error' : undefined"><option value="">Select a category</option><option>Human Anatomy</option><option>Clinical Nursing</option><option>Pharmacology</option><option>Public Health</option><option>Diagnostics</option><option>Emergency Care</option></select>
        <p v-if="errors.category" id="course-category-error" class="field-error">{{ errors.category }}</p>
      </div>
      <div class="field">
        <label for="course-description">Description <span aria-hidden="true">*</span></label>
        <textarea id="course-description" v-model.trim="form.description" rows="4" :aria-invalid="Boolean(errors.description)" :aria-describedby="errors.description ? 'course-description-error' : 'course-description-help'"></textarea>
        <p v-if="errors.description" id="course-description-error" class="field-error">{{ errors.description }}</p><p v-else id="course-description-help" class="field-help">Summarise the learner outcome in 20 characters or more.</p>
      </div>
      <div class="field">
        <label for="course-price">Price (USD) <span aria-hidden="true">*</span></label>
        <input id="course-price" v-model="form.price" type="number" min="0" step="1" inputmode="decimal" :aria-invalid="Boolean(errors.price)" :aria-describedby="errors.price ? 'course-price-error' : undefined" />
        <p v-if="errors.price" id="course-price-error" class="field-error">{{ errors.price }}</p>
      </div>
      <div class="modal-actions"><button class="button button-secondary" type="button" @click="closeModal">Cancel</button><button class="button button-primary" type="submit">Create course</button></div>
    </form>
  </BaseModal>

  <div v-if="toastVisible" class="toast" role="status" aria-live="polite"><span>Course draft created.</span><button type="button" aria-label="Dismiss notification" @click="toastVisible = false"><X aria-hidden="true" /></button></div>
</template>
