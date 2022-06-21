<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../store/store'
import Note from './Note.vue'

const store = useStore()

onMounted(() => {
  store.getNotes()
})

</script>

<template>
  <div class="w-screen overflow-x-hidden">
    <Note v-for="note in store.notes" :note=note :key=note.id />
  </div>
</template>

<style scoped>
</style>
