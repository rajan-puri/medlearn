<script setup lang="ts">
import { ArrowRight, Award, BookOpenCheck, GraduationCap, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-vue-next'
import CategoryCarousel from '@/components/CategoryCarousel.vue'
import CourseCard from '@/components/CourseCard.vue'
import PublicHeader from '@/components/PublicHeader.vue'
import SearchCombobox from '@/components/SearchCombobox.vue'
import { courses } from '@/data/mock'
</script>

<template>
  <PublicHeader />
  <main id="main-content">
    <section class="home-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><HeartPulse aria-hidden="true" /> Learning for better care</p>
          <h1 tabindex="-1">Build practical health science skills.</h1>
          <p class="hero-lede">Short, instructor-led courses for students and working professionals in nursing, anatomy, diagnostics and public health.</p>
          <SearchCombobox />
          <div class="hero-proof" aria-label="Platform highlights">
            <span><ShieldCheck aria-hidden="true" /> Evidence-informed lessons</span>
            <span><Award aria-hidden="true" /> Completion certificates</span>
          </div>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 540 480" fill="none">
            <path d="M105 410c-48-65-49-171-3-252C151 72 249 33 341 64c91 31 151 133 125 229-25 94-121 165-221 156-56-5-107-17-140-39Z" fill="#d7eee6" />
            <path d="M276 93c54 0 99 44 99 99v192H177V192c0-55 44-99 99-99Z" fill="#fff" />
            <path d="M227 143c17-30 55-41 84-24s40 55 23 84c-17 30-55 40-84 23-29-16-40-54-23-83Z" fill="#234e47" />
            <path d="M232 202c27 19 60 17 89-2v40h-89v-38Z" fill="#f2ad8f" />
            <path d="M204 237h144l24 147H180l24-147Z" fill="#b9a7ef" />
            <path d="M263 251v92M227 298h72" stroke="#fff" stroke-width="15" stroke-linecap="round" />
            <path d="M184 276c-43 16-68 55-69 118M349 270c48 18 73 58 75 122" stroke="#234e47" stroke-width="22" stroke-linecap="round" />
            <path d="M117 393h307" stroke="#163c37" stroke-width="12" stroke-linecap="round" />
            <circle cx="433" cy="116" r="48" fill="#f8c97c" />
            <path d="M433 91v50M408 116h50" stroke="#163c37" stroke-width="11" stroke-linecap="round" />
            <rect x="54" y="210" width="114" height="72" rx="22" fill="#fff" />
            <path d="M78 246h18l12-18 17 35 11-17h11" stroke="#e96567" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="hero-float-card float-top"><BookOpenCheck aria-hidden="true" /><span><strong>96%</strong> completion rate</span></div>
          <div class="hero-float-card float-bottom"><Stethoscope aria-hidden="true" /><span><strong>82</strong> practical courses</span></div>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="promo-grid" aria-label="Ways to use MedLearn">
        <article class="promo-card promo-student">
          <div><p class="eyebrow">For students</p><h2>Learn with a clear path.</h2><p>Follow guided lessons, knowledge checks and practical assignments.</p><RouterLink class="text-link" to="/courses">Find a course <ArrowRight aria-hidden="true" /></RouterLink></div>
          <GraduationCap aria-hidden="true" class="promo-illustration" />
        </article>
        <article class="promo-card promo-instructor">
          <div><p class="eyebrow">For instructors</p><h2>Teach what matters.</h2><p>Create focused courses, schedule assessments and support learners.</p><RouterLink class="text-link" to="/manage">Manage courses <ArrowRight aria-hidden="true" /></RouterLink></div>
          <BookOpenCheck aria-hidden="true" class="promo-illustration" />
        </article>
      </section>

      <CategoryCarousel />

      <section class="section latest-section" aria-labelledby="latest-heading">
        <div class="section-heading">
          <div><p class="eyebrow">Recently added</p><h2 id="latest-heading">Latest courses</h2></div>
          <RouterLink class="text-link" to="/courses">View all courses <ArrowRight aria-hidden="true" /></RouterLink>
        </div>
        <div class="course-grid home-course-grid">
          <CourseCard v-for="course in courses.slice(0, 4)" :key="course.id" :course="course" />
        </div>
      </section>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container"><strong>MedLearn</strong><p>Mock learning portal for health sciences education.</p><nav aria-label="Footer"><RouterLink to="/courses">Courses</RouterLink><RouterLink to="/manage">Instructor portal</RouterLink></nav></div>
  </footer>
</template>
