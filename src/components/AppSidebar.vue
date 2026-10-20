<script setup lang="ts">
import { BarChart3, BellRing, BookOpen, ClipboardList, GraduationCap, Home, Library, LogOut, Menu, Settings, Users, X } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'

defineProps<{ collapsed: boolean; mode?: 'learner' | 'instructor' }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <aside class="app-sidebar" :class="{ collapsed }">
    <div class="sidebar-head">
      <BrandLogo :compact="collapsed" />
      <button class="sidebar-toggle icon-button" type="button" :aria-expanded="!collapsed" aria-controls="workspace-navigation" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'" @click="$emit('toggle')">
        <Menu v-if="collapsed" aria-hidden="true" />
        <X v-else aria-hidden="true" />
      </button>
    </div>
    <nav id="workspace-navigation" aria-label="Workspace">
      <RouterLink to="/"><Home aria-hidden="true" /><span>Home</span></RouterLink>
      <RouterLink to="/courses"><Library aria-hidden="true" /><span>Explore courses</span></RouterLink>
      <a href="#saved"><BookOpen aria-hidden="true" /><span>Saved learning</span></a>
      <a href="#progress"><BarChart3 aria-hidden="true" /><span>My progress</span></a>
      <template v-if="mode === 'instructor'">
        <span class="sidebar-label">Teach</span>
        <RouterLink to="/manage"><GraduationCap aria-hidden="true" /><span>Courses</span></RouterLink>
        <a href="#learners"><Users aria-hidden="true" /><span>Learners</span></a>
        <a href="#assessments"><ClipboardList aria-hidden="true" /><span>Assessments</span></a>
      </template>
    </nav>
    <nav class="sidebar-bottom" aria-label="Account">
      <a href="#notifications"><BellRing aria-hidden="true" /><span>Notifications</span></a>
      <a href="#settings"><Settings aria-hidden="true" /><span>Settings</span></a>
      <a href="#logout"><LogOut aria-hidden="true" /><span>Sign out</span></a>
    </nav>
  </aside>
</template>
