<template>
  <div>{{ name }}</div>
  <q-btn label="eat most favorite" @click="eat('Ice Cream')" />
  <!-- <q-btn lable="eat" @click="eat('Ice Cream')" /> -->
  <q-btn label="eat least favorite" @click="eat('Sisig')" />
  <br />
  Chest {{ data.chest }}
  Waist {{ data.waist }}
  Hip {{ data.hips }}
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['ate'])

const props = defineProps({
  name: {
    type: String,
    default: 'no name'
  },
  foods: {
    type: Array,
    default: () => (['Ice Cream', 'Salad', 'Sisig'])
  }
})

const data = reactive({
  chest: 10,
  waist: 10,
  hips: 10,
  age: 20,
  children: [{
    name: 'jarvis'
  }]
})

function eat (food) {
  switch (food) {
    case props.foods[0]:
      data.chest += 2
      data.waist += 1
      data.hips += 3
      break
    case props.foods[props.foods.length - 1]:
      data.chest += 0
      data.waist += 0
      data.hips += 1
  }

  emit('ate', food, props.name)
}

</script>
