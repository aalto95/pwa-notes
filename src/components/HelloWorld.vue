<script setup>
import { defineComponent } from 'vue'
import { useStore } from '../store/store'
import { storeToRefs } from 'pinia'

defineProps({
  msg: String
})

const store = useStore()

</script>

<template>
  <h1>{{store.count}}</h1>
  <button @click="store.increment">click me</button>
</template>

<style scoped>
</style>
