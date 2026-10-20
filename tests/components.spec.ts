import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import BaseModal from '@/components/BaseModal.vue'
import CategoryCarousel from '@/components/CategoryCarousel.vue'
import SearchCombobox from '@/components/SearchCombobox.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }, { path: '/courses', name: 'explore', component: { template: '<div />' } }],
})

describe('accessible components', () => {
  it('combobox exposes and selects suggestions with the keyboard', async () => {
    const wrapper = mount(SearchCombobox, { attachTo: document.body, global: { plugins: [router] } })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('focus')
    expect(input.attributes('aria-expanded')).toBe('true')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    expect((input.element as HTMLInputElement).value.length).toBeGreaterThan(0)
  })

  it('carousel buttons change the visible category set and expose pause state', async () => {
    const wrapper = mount(CategoryCarousel, { global: { plugins: [router] } })
    const pause = wrapper.get('[aria-label="Pause carousel motion"]')
    expect(pause.attributes('aria-pressed')).toBe('false')
    await pause.trigger('click')
    expect(pause.attributes('aria-pressed')).toBe('true')
    await wrapper.get('[aria-label="Next categories"]').trigger('click')
    expect(wrapper.text()).toContain('Emergency Care')
  })

  it('modal is labelled and closes on Escape', async () => {
    const wrapper = mount(BaseModal, { attachTo: document.body, props: { open: true, title: 'Confirm action' } })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-modal')).toBe('true')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
