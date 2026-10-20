<script setup lang="ts">
import { Activity, BookOpen, HeartPulse, Microscope } from 'lucide-vue-next'

defineProps<{ tone: string; label: string }>()
</script>

<template>
  <div class="course-art" :class="`tone-${tone}`" role="img" :aria-label="`${label} abstract course illustration`">
    <svg class="art-lines" aria-hidden="true" viewBox="0 0 300 180" preserveAspectRatio="none">
      <path d="M-10 125C40 75 77 155 132 105s98-44 178-10" />
      <path d="M-10 42c72 65 112-24 175 25s85 44 145 9" />
      <circle cx="245" cy="44" r="26" />
    </svg>
    <div class="art-card art-card-main">
      <HeartPulse v-if="tone === 'rose' || tone === 'peach'" aria-hidden="true" />
      <Microscope v-else-if="tone === 'lavender' || tone === 'lemon'" aria-hidden="true" />
      <Activity v-else aria-hidden="true" />
    </div>
    <div class="art-card art-card-small"><BookOpen aria-hidden="true" /></div>
    <span class="art-dot dot-one"></span>
    <span class="art-dot dot-two"></span>
  </div>
</template>
