<script setup>
import { getCurrence, formatDate } from '../utils/format'
defineProps({
  items: { type: Array, required: true }
})

const emit = defineEmits(['edit'])

const edit = item => {
  emit('edit', item)
}
</script>
<template>
  <ul class="mt-4 space-y-2">
    <li
      v-for="item in items"
      :key="item.id"
      class="bg-slate-900 text-sm py-2 px-4 rounded flex items-center justify-between cursor-pointer hover:shadow-lg hover:bg-slate-800 transition-all duration-200"
      @click="edit(item)"
    >
      <div class="w-2/5">
        <h4 class="text-md font-medium">{{ item.name }}</h4>
        <p class="text-slate-400">{{ item.category }}</p>
      </div>
      <p class="text-xs hidden md:flex">{{ formatDate(item.created) }}</p>
      <p class="text-xs hidden md:flex">{{ item.wallet }}</p>
      <p>
        {{ getCurrence(item.value) }}
      </p>
    </li>
    <li
      v-if="!items.length"
      class="bg-trnasparent py-8 px-4 rounded flex items-center justify-center cursor-pointer transition-all duration-200"
    >
      <p class="font-medium">
        Nenhuma despesa encontrada. Cadastre uma nova despesa.
      </p>
    </li>
  </ul>
</template>
