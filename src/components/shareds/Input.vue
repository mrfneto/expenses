<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: String,
  label: String,
  modelValue: [String, Number]
})

const input = ref(null)

const classes =
  'py-2 px-4 bg-slate-800 text-current rounded block w-full border border-slate-400 focus:outline-none focus:border-amerald-400 focus:ring focus:ring-emerald-300 focus:ring-opacity-50'
const errorClass = 'border-red-400 focus:border-red-400 focus:ring-red-300'
onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>
<template>
  <div :class="$attrs.class">
    <label
      v-if="label"
      class="block font-medium text-slate-300 mb-1 text-sm"
      :for="id"
      >{{ label }}:</label
    >

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, error && errorClass]"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <select
      v-else-if="type === 'select'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, error && errorClass]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </select>

    <input
      v-else
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, error && errorClass]"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div v-if="error" class="text-red-600 text-sm mt-0.5">{{ error }}</div>
  </div>
</template>
