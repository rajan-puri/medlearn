<script setup lang="ts">
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next'
import { ref } from 'vue'
import { categories } from '@/data/mock'

const track = ref<HTMLElement | null>(null)
const motionPaused = ref(false)

function move(direction: -1 | 1): void {
  track.value?.scrollBy({ left: direction * 320, behavior: motionPaused.value ? 'auto' : 'smooth' })
}
</script>

<template>
  <section class="section categories-section" aria-labelledby="categories-heading">
    <div class="section-heading carousel-heading">
      <div>
        <p class="eyebrow">Choose a field</p>
        <h2 id="categories-heading">Popular categories</h2>
      </div>
      <div class="carousel-controls" aria-label="Category carousel controls">
        <button class="icon-button" type="button" aria-label="Previous categories" @click="move(-1)"><ChevronLeft aria-hidden="true" /></button>
        <button class="icon-button" type="button" :aria-label="motionPaused ? 'Resume carousel motion' : 'Pause carousel motion'" :aria-pressed="motionPaused" @click="motionPaused = !motionPaused">
          <Play v-if="motionPaused" aria-hidden="true" />
          <Pause v-else aria-hidden="true" />
        </button>
        <button class="icon-button" type="button" aria-label="Next categories" @click="move(1)"><ChevronRight aria-hidden="true" /></button>
      </div>
    </div>
    <div ref="track" class="category-track" tabindex="0" aria-label="Course categories. Use the labelled controls to browse.">
      <RouterLink v-for="category in categories" :key="category.id" class="category-card" :class="`tone-${category.tone}`" :to="{ name: 'explore', query: { category: category.label } }">
        <span class="category-number">{{ String(category.count).padStart(2, '0') }}</span>
        <h3>{{ category.label }}</h3>
        <p>{{ category.description }}</p>
        <span class="category-count">{{ category.count }} courses</span>
      </RouterLink>
    </div>
  </section>
</template>
