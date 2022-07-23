<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 41 Todo App</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <div class="row q-pa-md q-gutter-sm">
      <q-input class="col" v-model="todo" @keyup.enter="add" clearable />
      <!-- <q-btn icon="save" label="add" /> -->
    </div>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(task,i) in todos" :key="task._id">
        <q-item-section avatar>
          <q-checkbox v-model="task.isDone" />
        </q-item-section>
        <q-item-section>
          {{ task.desc }}
        </q-item-section>
        <q-item-section side>
          <q-btn flat dense round icon="delete" @click="remove(i)" color="red" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style>
h4 {
  color: pink;
}
.blue-color {
  color:aqua;
}
.backg-black {
  background-color:black;
}
</style>

<script setup>
import { ref } from 'vue'
const todo = ref('test')
const todos = ref([
  {
    _id: Date.now(),
    desc: 'create add function',
    isDone: false
  }
])
function clearTodo () {
  todo.value = ''
}
function add () {
  todos.value.unshift({
    _id: Date.now(),
    desc: todo.value,
    isDone: false
  })
  clearTodo()
}
function remove (i) {
  todos.value.splice(i, 1)
}
</script>
