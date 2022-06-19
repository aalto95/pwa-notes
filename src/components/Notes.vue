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
  <p v-for="note in store.notes">{{note}}</p>
  <button @click="store.increment">click me</button>
</template>

<style scoped>
</style>
