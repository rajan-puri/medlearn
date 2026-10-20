<script setup lang="ts">
import { Bell, Search } from 'lucide-vue-next'

defineProps<{ label: string }>()
</script>

<template>
  <header class="workspace-header">
    <div class="workspace-search">
      <Search aria-hidden="true" />
      <label class="sr-only" for="workspace-search">Search courses</label>
      <input id="workspace-search" type="search" placeholder="Search courses" />
    </div>
    <span class="workspace-context">{{ label }}</span>
    <button class="icon-button" type="button" aria-label="Notifications"><Bell aria-hidden="true" /></button>
    <button class="avatar-button" type="button" aria-label="Open profile menu">ML</button>
  </header>
</template>
