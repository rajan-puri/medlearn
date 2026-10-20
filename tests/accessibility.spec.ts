import axe from 'axe-core'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { describe, expect, it } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import ManageCoursesView from '@/views/ManageCoursesView.vue'

async function mountScreen(component: object, path = '/'): Promise<{ wrapper: VueWrapper; router: Router }> {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/courses', name: 'explore', component: ExploreView },
      { path: '/courses/:slug', name: 'course-detail', component: CourseDetailView },
      { path: '/manage', name: 'manage', component: ManageCoursesView },
    ],
  })
  await router.push(path)
  await router.isReady()
  const wrapper = mount(component, { attachTo: document.body, global: { plugins: [router] } })
  return { wrapper, router }
}

async function expectNoAxeViolations(wrapper: VueWrapper): Promise<void> {
  const result = await axe.run(wrapper.element, {
    rules: {
      // jsdom has no layout engine, so automated color calculations are covered in browser review.
      'color-contrast': { enabled: false },
    },
  })
  expect(result.violations, result.violations.map((item) => `${item.id}: ${item.help}`).join('\n')).toEqual([])
}

describe('screen accessibility', () => {
  it('Home has no detectable axe violations', async () => {
    const { wrapper } = await mountScreen(HomeView)
    await expectNoAxeViolations(wrapper)
  })

  it('Explore Courses has no detectable axe violations', async () => {
    const { wrapper } = await mountScreen(ExploreView, '/courses')
    await expectNoAxeViolations(wrapper)
  })

  it('Course detail has no detectable axe violations', async () => {
    const { wrapper } = await mountScreen(CourseDetailView, '/courses/clinical-anatomy-in-practice')
    await expectNoAxeViolations(wrapper)
  })

  it('Manage Courses has no detectable axe violations', async () => {
    const { wrapper } = await mountScreen(ManageCoursesView, '/manage')
    await expectNoAxeViolations(wrapper)
  })
})
