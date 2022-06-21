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
  <div class="w-screen overflow-x-hidden mb-4" v-if="store.pinnedNotes.length">
    <Note v-for="pinnedNote in store.pinnedNotes" :note=pinnedNote :key=pinnedNote.id :pinned="true" />
  </div>
</template>

<style scoped>
</style>
