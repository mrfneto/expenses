<script setup>
import Modal from './Modal.vue'
import Button from './Button.vue'
import Close from '../icons/Close.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save', 'close'])

const save = () => {
  emit('save')
}

const close = () => {
  emit('close')
}
</script>
<template>
  <Modal :show="show" max-width="md" :closeable="false">
    <form class="p-6" @submit.prevent="save">
      <!-- Header -->
      <div
        class="flex items-center pb-3 border-b border-slate-700 text-slate-50"
      >
        <h3 class="text-xl font-bold flex-1">{{ title }}</h3>
        <button @click="close" type="button">
          <Close class="w-6 h-6" />
        </button>
      </div>
      <!-- Content -->
      <div class="my-8 text-slate-50">
        <slot />
      </div>

      <!-- Footer -->
      <div class="border-t border-slate-700 flex justify-end pt-4 space-x-4">
        <Button tabindex="-1" @click="close" type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">Save</Button>
      </div>
    </form>
  </Modal>
</template>
