<script setup>
import { ref, watch } from 'vue'
import ModalForm from './shareds/ModalForm.vue'
import Input from './shareds/Input.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
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

const item = ref({})

const save = () => {
  emit('save', item.value)
}

const close = () => {
  emit('close')
}

watch(
  () => props.item,
  newValue => {
    item.value = { ...props.item }
  }
)
</script>
<template>
  <ModalForm :show="show" @close="close" @save="save" :title="title">
    <Input
      id="name"
      type="text"
      v-model="item.name"
      label="Descrição"
      required
      class="mb-4"
    />
    <Input
      id="category"
      type="select"
      v-model="item.category"
      label="Categoria"
      required
      class="mb-4"
    >
      <option selected disabled>Selecione uma opção</option>
      <option>Alimentos</option>
      <option>Transporte</option>
      <option>Viagens</option>
      <option>Lazer</option>
      <option>Saúde</option>
      <option>Moradia</option>
    </Input>
    <Input
      id="wallet"
      type="select"
      v-model="item.wallet"
      label="Carteira"
      required
      class="mb-4"
    >
      <option selected disabled>Selecione uma opção</option>
      <option>Crédito</option>
      <option>Débito</option>
      <option>Dinheiro</option>
    </Input>
    <Input
      id="value"
      type="number"
      v-model="item.value"
      label="Valor"
      required
      min="0"
      step="0.01"
    />
  </ModalForm>
</template>
