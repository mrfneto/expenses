<script setup>
import Modal from './Modal.vue'
import Button from './Button.vue'
import Close from '../icons/Close.vue'
import { useModalState, confirmModal } from '../../services/modalService'

const modal = useModalState()

const confirm = response => {
  confirmModal(response)
}
</script>
<template>
  <Modal :show="modal.visible" max-width="md">
    <div class="p-6">
      <!-- Header -->
      <div
        class="flex items-center pb-3 border-b border-slate-700 text-slate-50"
      >
        <h3 class="text-xl font-bold flex-1">Confirm</h3>
        <button @click="confirm(false)">
          <Close class="w-6 h-6" />
        </button>
      </div>
      <!-- Content -->
      <div class="my-8 text-slate-50">
        {{ modal.message }}
      </div>

      <!-- Footer -->
      <div class="border-t border-slate-700 flex justify-end pt-4 space-x-4">
        <Button
          tabindex="-1"
          @click="confirm(false)"
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button type="submit" variant="danger" @click="confirm(true)">
          Confirm
        </Button>
      </div>
    </div>
  </Modal>
</template>
