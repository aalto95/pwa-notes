<script setup>
import { defineComponent, onMounted } from 'vue'
import { useStore } from '../store/store'
import { storeToRefs } from 'pinia'
import Note from './Note.vue'

defineProps({
  msg: String
})

const store = useStore()

onMounted(() => {
  store.getNotes()
})

</script>

<template>
  <div class="w-screen overflow-x-hidden">
    <Note v-for="note in store.notes" :note=note />
  </div>
</template>

<style scoped>
</style>
