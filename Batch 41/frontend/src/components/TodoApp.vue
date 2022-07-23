/* eslint-disable no-const-assign */
<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 41 Todo App</q-toolbar-title>
      <q-input dark standout v-if="isHidden" />
      <!-- <q-btn round icon="search" @click="isHidden = !isHidden" /> -->
      <q-btn round dense icon="description" @click="downloadExcel" />
      <q-btn round dense icon="picture_as_pdf" @click="openPDF" />
    </q-toolbar>
  </div>
  <pie-chart :donut="true" :data="[['Active', activeTodos.length], ['Completed', completedTodos.length]]"></pie-chart>
  <!-- <div id="app">
    <button @click="isHidden = true">Hide the text below</button>
    <button @click="isHidden = !isHidden">Toggle hide and show</button>

    <h1 v-if="!isHidden">Hide me on click event!</h1>
  </div> -->
  <div>
    <q-input v-model="text1" @keyup.enter="insertToDoItem(text1)" placeholder="Insert To Do">
      <q-btn flat @click="insertToDoItem(text1)">
        <q-icon name="send" />
      </q-btn>
    </q-input>
    <!-- <input v-model='text1' type="text" @keyup.enter="insertToDoItem(text1)"> -->

    <q-tabs v-model="tab" inline-label class="bg-purple text-white shadow-2">
      <q-tab name="all" label="All" />
      <q-tab name="active" label="Active" />
      <q-tab name="completed" label="Completed" />
    </q-tabs>

    <q-card class="my-card">
      <q-card-section horizontal v-for="(task) in todosByStatus" :key="task.id">
        <q-checkbox :modelValue="task.isDone" @click="todosSrvc.patch(task._id, { isDone: !task.isDone } )" />
        <q-item-section :class="{ 'done text-grey': task.isDone }">
          {{ task.desc }}
        </q-item-section>
        <q-btn @click="deleteToDoItem(task._id)" side flat icon="delete" />
      </q-card-section>
    </q-card>

  </div>
  <div>
    {{ itemsLeft }} item/s left
    <q-btn label="Clear Completed" @click="deleteCompleted()"/>
  </div>
  <br />

  <z-human name="Ericsson Tee" @ate="logFood" />

</template>

<style scoped>
.done {
  text-decoration: line-through;
  /* color: gray; */
}
</style>

<script setup>

import { ref, computed, getCurrentInstance } from 'vue'

import ZHuman from './ZHuman.vue'

const { $pdfMake, $wings, $xlsxUtils, $xlsxWrite } = getCurrentInstance().appContext.config.globalProperties

const excelWrite = $xlsxWrite
const excelUtils = $xlsxUtils

const todosSrvc = $wings.wingsService('todos')

todosSrvc.on('dataChange', tasks => {
  toDoArray.value = [...tasks]
})

todosSrvc.init()

const toDoArray = ref([])
const text1 = ref('')
const isHidden = ref(false)
const tab = ref()

const completedTodos = computed(() => toDoArray.value.filter(t => t.isDone))
const activeTodos = computed(() => toDoArray.value.filter(t => !t.isDone))

const todosByStatus = computed(() => {
  switch (tab.value) {
    case '':
      return toDoArray.value
    case 'active':
      return activeTodos.value
    case 'completed':
      return completedTodos.value
    default:
      return toDoArray.value
  }
})

const itemsLeft = computed(() => activeTodos.value.length)

// const tasks = toDoArray.value.map(t => [t.desc, t.isDone ? 'Done' : 'Pending'])

// This function is created to be served as one variable for print functions such as excel and pdf
const tasks = () => toDoArray.value.map(t => {
  return {
    todo: t.desc,
    status: t.isDone ? 'Done' : 'Pending'
  }
})

const downloadExcel = () => {
  const getTasks = tasks()
  // const tasks = toDoArray.value.map(t => {
  //   return {
  //     todo: t.desc,
  //     status: t.isDone ? 'Done' : 'Pending'
  //   }
  // })

  console.log(getTasks)
  const data = excelUtils.json_to_sheet(getTasks) // XLSX.utils.json_to_sheet()
  const wb = excelUtils.book_new() // XLSX.utils.book_new()
  excelUtils.book_append_sheet(wb, data, 'todo') // XLSX.utils.book_append_sheet()
  excelWrite(wb, 'todo.xlsx') // XLSX.writeFile()
}

const openPDF = () => {
  const getTasksB = Object.values(tasks()).map(Object.values) // Convert object to string
  // const getTasksO = toDoArray.value.map(t => [t.desc, t.isDone ? 'Done' : 'Pending'])

  const dd = {
    content: [{
      table: {
        body: [
          ['Todo', 'Status'],
          ...getTasksB
        ]
      }
    }]
  }
  // dd.content[0].table.body = tasks
  $pdfMake.createPdf(dd).open()
}

const logFood = (food, name) => {
  console.log(`Kinain ni ${name} ang kanyang ${food}`)
}

async function insertToDoItem (x) {
  // toDoArray.value.push({
  //   id: Math.random(),
  //   desc: x,
  //   isDone: false
  // })
  await todosSrvc.create({
    desc: x,
    isDone: false
  })
  // console.log(toDoArray)
  // eslint-disable-next-line no-const-assign
  clearText()
  // console.log(activeTodos)
}

const deleteToDoItem = async (x) => {
  await todosSrvc.remove(x)
}

const deleteCompleted = async () => {
  await todosSrvc.remove(null, { query: { isDone: true } })
}

const clearText = () => {
  text1.value = ''
}

</script>
