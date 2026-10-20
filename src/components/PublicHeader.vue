<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import BrandLogo from './BrandLogo.vue'

const open = ref(false)
</script>

<template>
  <header class="public-header">
    <div class="container header-inner">
      <BrandLogo />
      <button class="mobile-nav-button icon-button" type="button" :aria-expanded="open" aria-controls="public-nav" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open = !open">
        <X v-if="open" aria-hidden="true" />
        <Menu v-else aria-hidden="true" />
      </button>
      <nav id="public-nav" class="public-nav" :class="{ open }" aria-label="Primary">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/courses">Explore courses</RouterLink>
        <RouterLink to="/manage">Instructor portal</RouterLink>
      </nav>
      <RouterLink class="button button-primary header-cta" to="/courses">Browse courses</RouterLink>
    </div>
  </header>
</template>
