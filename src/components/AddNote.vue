<script setup lang="ts">
import { useStore } from '../store/store'
import {ref} from 'vue'

const store = useStore()
const note = ref("")

function addNote() {
  store.addNote(note.value)
  note.value = ""
}

</script>

<template>
  <div class="mt-4">
    <input v-model="note" @keyup.enter="addNote" placeholder="Add Note" type="text" class="bg-light-400 border-dark-400 border-b-dark-800 p-2 outline-none">
    <button class="bg-black p-2 w-20 text-gray-400 font-bold" @click="addNote()">Add</button>
  </div>
</template>

<style scoped>
</style>
