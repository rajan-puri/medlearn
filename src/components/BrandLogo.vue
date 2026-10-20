<script setup lang="ts">
defineProps<{ compact?: boolean }>()
</script>

<template>
  <RouterLink class="brand" to="/" aria-label="MedLearn home">
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none">
      <path d="M8 11.5 20 5l12 6.5v17L20 35 8 28.5v-17Z" fill="currentColor" />
      <path d="M14 16.5h12M20 10.5v19M14 23.5h12" stroke="white" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="20" cy="20" r="3" fill="white" />
    </svg>
    <span v-if="!compact">MedLearn</span>
  </RouterLink>
</template>
