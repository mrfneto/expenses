<script setup>
const props = defineProps({
  variant: { type: String, default: 'base' },
  size: { type: String, default: 'md' },
  to: { String, Object },
  circle: Boolean,
  icon: Boolean,
  full: Boolean
})

const variantClasses = {
  base: 'bg-transparent text-slate-50 hover:bg-slate-700 focus:ring-slate-700 ',
  primary:
    'text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300',
  danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300',
  secondary:
    ' bg-transparent text-slate-50 border border-slate-400 hover:bg-slate-700 focus:ring-slate-300',
  link: 'bg-transparent text-slate-50 shadow-none text-slate-700 underline-offset-4 hover:underline'
}

const sizeClasses = {
  sm: props.icon ? 'h-8 w-8' : 'px-3 h-8 text-sm',
  md: props.icon ? 'h-10 w-10' : 'px-4 h-10 text-sm',
  lg: props.icon ? 'h-12 w-12' : 'px-4 h-12 text-base'
}
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="inline-flex items-center justify-center tracking-wide font-medium transition duration-300 transform focus:ring focus:ring-opacity-50 focus:active:scale-95 capitalize"
    :class="[
      variantClasses[variant],
      variant === 'link' ? 'p-0' : sizeClasses[size],
      circle ? 'rounded-full' : 'rounded',
      full ? 'w-full' : ''
    ]"
  >
    <slot />
  </component>
</template>
