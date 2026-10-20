import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import ManageCoursesView from '@/views/ManageCoursesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/courses', name: 'explore', component: ExploreView },
    { path: '/courses/:slug', name: 'course-detail', component: CourseDetailView },
    { path: '/manage', name: 'manage', component: ManageCoursesView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach(() => {
  requestAnimationFrame(() => document.querySelector<HTMLElement>('h1')?.focus())
})

export default router
