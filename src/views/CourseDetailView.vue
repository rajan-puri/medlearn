<script setup lang="ts">
import { Award, BookOpen, CalendarDays, Check, Clock3, MessageCircle, ShieldCheck, Users } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseModal from '@/components/BaseModal.vue'
import BrandLogo from '@/components/BrandLogo.vue'
import CourseArtwork from '@/components/CourseArtwork.vue'
import { courses, reviews, timeSlots } from '@/data/mock'

const route = useRoute()
const course = computed(() => courses.find((item) => item.slug === route.params.slug) ?? courses[0]!)
const tabs = ['About', 'Schedule', 'Assessments', 'Reviews'] as const
type Tab = typeof tabs[number]
const activeTab = ref<Tab>('About')
const tabButtons = ref<HTMLButtonElement[]>([])
const selectedSlot = ref('13:00')
const enrollOpen = ref(false)
const enrolled = ref(false)

function setTabRef(element: unknown, index: number): void {
  if (element instanceof HTMLButtonElement) tabButtons.value[index] = element
}

function onTabKeydown(event: KeyboardEvent, index: number): void {
  let nextIndex = index
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = tabs.length - 1
  else return
  event.preventDefault()
  const nextTab = tabs[nextIndex]
  if (nextTab) activeTab.value = nextTab
  tabButtons.value[nextIndex]?.focus()
}

function confirmEnrollment(): void {
  enrolled.value = true
  enrollOpen.value = false
}
</script>

<template>
  <div class="detail-page">
    <header class="detail-header">
      <BrandLogo />
      <nav aria-label="Primary"><RouterLink to="/courses">Explore courses</RouterLink><RouterLink to="/manage">Instructor portal</RouterLink></nav>
      <button class="avatar-button" type="button" aria-label="Open profile menu">ML</button>
    </header>
    <main id="main-content" class="detail-main">
      <nav class="breadcrumb" aria-label="Breadcrumb"><RouterLink to="/courses">Courses</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ course.title }}</span></nav>
      <div class="detail-layout">
        <div class="detail-content">
          <section class="instructor-card" aria-labelledby="course-title">
            <div class="instructor-summary">
              <div class="placeholder-avatar avatar-large" aria-hidden="true">AS</div>
              <div><span class="verified-label"><ShieldCheck aria-hidden="true" /> MedLearn verified</span><h1 id="course-title" tabindex="-1">{{ course.title }}</h1><p>Led by {{ course.instructor }} · {{ course.category }}</p></div>
            </div>
            <p class="course-description">A structured, practice-led course connecting core concepts with realistic clinical decisions. Learn through concise lessons, annotated diagrams and guided case reviews.</p>
            <div class="tag-list" aria-label="Course topics"><span>Clinical foundations</span><span>Applied practice</span><span>Case review</span><span>Assessment</span></div>
            <dl class="detail-stats">
              <div><BookOpen aria-hidden="true" /><dt class="sr-only">Lessons</dt><dd>{{ course.lessons }} lessons</dd></div>
              <div><Clock3 aria-hidden="true" /><dt class="sr-only">Duration</dt><dd>{{ course.duration }}</dd></div>
              <div><Users aria-hidden="true" /><dt class="sr-only">Learners</dt><dd>{{ course.learners.toLocaleString() }} learners</dd></div>
              <div><Award aria-hidden="true" /><dt class="sr-only">Level</dt><dd>{{ course.level }}</dd></div>
            </dl>
          </section>

          <div class="tabs" role="tablist" aria-label="Course information">
            <button v-for="(tab, index) in tabs" :id="`tab-${tab.toLowerCase()}`" :key="tab" :ref="(element) => setTabRef(element, index)" role="tab" type="button" :aria-selected="activeTab === tab" :aria-controls="`panel-${tab.toLowerCase()}`" :tabindex="activeTab === tab ? 0 : -1" @click="activeTab = tab" @keydown="onTabKeydown($event, index)">{{ tab }}</button>
          </div>

          <section v-if="activeTab === 'About'" id="panel-about" class="tab-panel" role="tabpanel" aria-labelledby="tab-about" tabindex="0">
            <h2>What you will learn</h2>
            <div class="learning-grid"><p><Check aria-hidden="true" /> Explain essential structures and their clinical relevance.</p><p><Check aria-hidden="true" /> Apply a systematic approach to patient scenarios.</p><p><Check aria-hidden="true" /> Communicate findings using precise health terminology.</p><p><Check aria-hidden="true" /> Recognise common safety risks and escalation points.</p></div>
          </section>

          <section v-else-if="activeTab === 'Schedule'" id="panel-schedule" class="tab-panel" role="tabpanel" aria-labelledby="tab-schedule" tabindex="0">
            <div class="panel-heading"><div><h2>Choose a live review session</h2><p>Times are shown in your local timezone.</p></div><span><CalendarDays aria-hidden="true" /> 24 October</span></div>
            <fieldset class="time-slots"><legend>Select one time</legend><label v-for="slot in timeSlots" :key="slot" :class="{ selected: selectedSlot === slot }"><input v-model="selectedSlot" type="radio" name="time-slot" :value="slot" /><span>{{ slot }}</span></label></fieldset>
          </section>

          <section v-else-if="activeTab === 'Assessments'" id="panel-assessments" class="tab-panel" role="tabpanel" aria-labelledby="tab-assessments" tabindex="0">
            <h2>Assessment plan</h2><ol class="assessment-list"><li><strong>Weekly knowledge checks</strong><span>8 short quizzes · untimed</span></li><li><strong>Clinical case workbook</strong><span>Submit in week 4</span></li><li><strong>Final applied assessment</strong><span>45 minutes · pass mark 70%</span></li></ol>
          </section>

          <section v-else id="panel-reviews" class="tab-panel" role="tabpanel" aria-labelledby="tab-reviews" tabindex="0">
            <h2>Learner reviews</h2><article v-for="review in reviews" :key="review.id" class="review-row"><div class="placeholder-avatar" aria-hidden="true">{{ review.initials }}</div><div><div class="review-meta"><strong>{{ review.author }}</strong><span :aria-label="`${review.rating} out of 5 stars`">{{ '★'.repeat(review.rating) }}<span aria-hidden="true">{{ '☆'.repeat(5 - review.rating) }}</span></span></div><p>{{ review.text }}</p><time>{{ review.date }}</time></div></article>
          </section>
        </div>

        <aside class="enroll-column" aria-label="Course enrollment">
          <div class="enroll-card">
            <CourseArtwork :tone="course.accent" :label="course.title" />
            <p class="price-label">Full course access</p><div class="price"><strong>${{ course.price }}</strong><span>one time</span></div>
            <button class="button button-accent button-block" type="button" @click="enrollOpen = true">{{ enrolled ? 'Enrolled' : 'Enroll in course' }}</button>
            <p v-if="enrolled" class="success-note" role="status"><Check aria-hidden="true" /> Enrollment confirmed</p>
            <ul class="enroll-benefits"><li><Check aria-hidden="true" /> {{ course.lessons }} lessons</li><li><Check aria-hidden="true" /> Downloadable notes</li><li><Check aria-hidden="true" /> Completion certificate</li></ul>
          </div>
          <section class="rating-card" aria-labelledby="rating-title"><div><p id="rating-title">Learner rating</p><strong>{{ course.rating }}</strong><span aria-label="5 out of 5 stars">★★★★★</span><small>{{ course.learners.toLocaleString() }} learners</small></div><div class="rating-bars"><label v-for="value in [5,4,3,2,1]" :key="value"><span>{{ value }}</span><progress :value="value === 5 ? 82 : value === 4 ? 14 : 2" max="100">{{ value === 5 ? 82 : value === 4 ? 14 : 2 }}%</progress></label></div></section>
        </aside>
      </div>
    </main>
  </div>

  <BaseModal :open="enrollOpen" title="Confirm enrollment" :description="`Enroll in ${course.title} for $${course.price}.`" @close="enrollOpen = false">
    <div class="modal-summary"><MessageCircle aria-hidden="true" /><p>You will receive immediate access to all course lessons and upcoming live sessions.</p></div>
    <div class="modal-actions"><button class="button button-secondary" type="button" @click="enrollOpen = false">Cancel</button><button class="button button-accent" type="button" @click="confirmEnrollment">Confirm enrollment</button></div>
  </BaseModal>
</template>
