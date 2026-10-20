<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories, courses } from '@/data/mock'

const router = useRouter()
const query = ref('')
const category = ref('All categories')
const isOpen = ref(false)
const activeIndex = ref(-1)

const suggestions = computed(() => {
  const normalized = query.value.trim().toLowerCase()
  if (!normalized) return courses.slice(0, 5)
  return courses.filter((course) => course.title.toLowerCase().includes(normalized)).slice(0, 5)
})

function openList(): void {
  isOpen.value = true
  activeIndex.value = suggestions.value.length ? 0 : -1
}

function closeList(): void {
  isOpen.value = false
  activeIndex.value = -1
}

function scheduleClose(): void {
  window.setTimeout(closeList, 120)
}

function choose(index: number): void {
  const course = suggestions.value[index]
  if (!course) return
  query.value = course.title
  closeList()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) openList()
    else activeIndex.value = Math.min(activeIndex.value + 1, suggestions.value.length - 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (event.key === 'Enter' && isOpen.value && activeIndex.value >= 0) {
    event.preventDefault()
    choose(activeIndex.value)
  } else if (event.key === 'Escape') {
    // Prevent the native search-input Escape action from clearing the field and
    // firing a new input event, which would reopen the suggestion list.
    event.preventDefault()
    closeList()
  }
}

async function submit(): Promise<void> {
  closeList()
  await nextTick()
  void router.push({ name: 'explore', query: { q: query.value, category: category.value } })
}
</script>

<template>
  <form class="hero-search" role="search" aria-label="Search health science courses" @submit.prevent="submit">
    <div class="combobox-wrap">
      <label for="course-search">Keyword</label>
      <div class="input-with-icon">
        <Search aria-hidden="true" />
        <input
          id="course-search"
          v-model="query"
          role="combobox"
          type="search"
          autocomplete="off"
          aria-autocomplete="list"
          aria-controls="course-suggestions"
          :aria-expanded="isOpen"
          :aria-activedescendant="activeIndex >= 0 ? `course-option-${activeIndex}` : undefined"
          placeholder="Anatomy, nursing, diagnostics..."
          @focus="openList"
          @input="openList"
          @keydown="onKeydown"
          @blur="scheduleClose"
        />
      </div>
      <ul v-if="isOpen" id="course-suggestions" class="combobox-list" role="listbox" aria-label="Course suggestions">
        <li
          v-for="(course, index) in suggestions"
          :id="`course-option-${index}`"
          :key="course.id"
          role="option"
          :aria-selected="activeIndex === index"
          @mousedown.prevent="choose(index)"
        >
          {{ course.title }}
          <span>{{ course.category }}</span>
        </li>
        <li v-if="!suggestions.length" class="empty-option">No matching courses</li>
      </ul>
    </div>
    <div class="category-select-wrap">
      <label for="hero-category">Category</label>
      <select id="hero-category" v-model="category">
        <option>All categories</option>
        <option v-for="item in categories" :key="item.id">{{ item.label }}</option>
      </select>
    </div>
    <button class="button button-primary search-submit" type="submit">Search</button>
  </form>
</template>
