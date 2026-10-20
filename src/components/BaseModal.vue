<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ open: boolean; title: string; description?: string }>()
const emit = defineEmits<{ close: [] }>()
const panel = ref<HTMLElement | null>(null)
let returnTarget: HTMLElement | null = null

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function close(): void {
  emit('close')
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab' || !panel.value) return
  // ARIA dialog focus trap: focus stays within the modal until it is dismissed.
  const items = Array.from(panel.value.querySelectorAll<HTMLElement>(focusableSelector))
  const first = items[0]
  const last = items.at(-1)
  if (!first || !last) return
  if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.value)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    returnTarget = document.activeElement as HTMLElement | null
    document.body.classList.add('modal-open')
    await nextTick()
    panel.value?.focus()
    document.addEventListener('keydown', onKeydown)
  } else {
    document.body.classList.remove('modal-open')
    document.removeEventListener('keydown', onKeydown)
    returnTarget?.focus()
  }
}, { immediate: true })

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-layer" @mousedown.self="close">
      <section ref="panel" class="modal-panel" role="dialog" aria-modal="true" :aria-labelledby="'modal-title'" :aria-describedby="description ? 'modal-description' : undefined" tabindex="-1">
        <div class="modal-heading">
          <div>
            <h2 id="modal-title">{{ title }}</h2>
            <p v-if="description" id="modal-description">{{ description }}</p>
          </div>
          <button class="icon-button" type="button" aria-label="Close dialog" @click="close"><X aria-hidden="true" /></button>
        </div>
        <slot />
      </section>
    </div>
  </Teleport>
</template>
