<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCurrentMonth, getCurrentDate, getCurrence } from '../utils/format'
import { expenseService } from '../services/databaseService'
import Plus from './icons/Plus.vue'
import ExpenseList from './ExpenseList.vue'
import ExpenseForm from './ExpenseForm.vue'

const items = ref([])
const currentItem = ref({})
const showForm = ref(false)
const total = ref(0)
const loading = ref(false)

const currentMonth = ref('')

const add = () => {
  currentItem.value = {
    name: '',
    category: '',
    wallet: '',
    value: ''
  }
  showForm.value = true
}
const save = async item => {
  const dataExpense = {
    name: item.name,
    category: item.category,
    wallet: item.wallet,
    value: parseFloat(item.value),
    created: item.id ? item.created : getCurrentDate()
  }

  if (item.id) {
    await expenseService.update(dataExpense, item.id)
  } else {
    await expenseService.create(dataExpense)
  }
  await load()
  close()
}
const edit = item => {
  currentItem.value = { ...item }
  showForm.value = true
}

const remove = async item => {
  console.log(item)
  await expenseService.remove(item.id)
  await load()
  close()
}

const close = item => {
  currentItem.value = {}
  showForm.value = false
}

const load = async () => {
  loading.value = true
  try {
    const paramenters = [
      ['sorting', { field: 'created' }],
      [
        'filter',
        { field: 'created', operator: '>=', value: `${currentMonth.value}-01` }
      ],
      [
        'andOrFilter',
        { field: 'created', operator: '<', value: `${currentMonth.value}-32` }
      ]
    ]
    const result = await expenseService.get(paramenters)
    items.value = result.data
    setTotal()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const setTotal = () => {
  let totalValue = 0
  for (let i = 0; i < items.value.length; i++) {
    totalValue = totalValue + parseFloat(items.value[i].value)
  }
  total.value = totalValue
}

onMounted(() => {
  currentMonth.value = getCurrentMonth()
  load()
})
</script>
<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <header class="flex items-start justify-between">
      <h1 class="text-3xl font-bold">Minha Despesas</h1>
      <div>
        <p class="text-state-400">Total das dispensas</p>
        <p class="text-xl font-bold float-right">{{ getCurrence(total) }}</p>
      </div>
    </header>
    <main class="py-8">
      <header class="flex items-center justify-between">
        <input
          @change="load"
          v-model="currentMonth"
          type="month"
          class="bg-transparent outline-none py-2 border border-slate-400 rounded px-4"
        />

        <button
          @click="add"
          class="inline-flex items-center justify-center h-10 w-10 sm:px-6 sm:w-auto bg-emerald-600 rounded hover:bg-emerald-700 transition-colors duration-200"
        >
          <Plus class="w-5 h-5" />
          <span class="hidden sm:flex ml-2">Cadastrar</span>
        </button>
      </header>

      <section class="pt-8">
        <h2 class="text-xl font-semibold">Despesas</h2>

        <div v-if="loading" class="p-6 text-center">
          <p class="text-lg">Carrengando...</p>
        </div>

        <ExpenseList v-else :items="items" @edit="edit" />
        <ExpenseForm
          :show="showForm"
          :item="currentItem"
          @close="close"
          @save="save"
          @remove="remove"
          title="Despesa"
        />
      </section>
    </main>
  </div>
</template>
