<script setup>
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
  <div>
    <input v-model="note" @keyup.enter="addNote" placeholder="Add Note" type="text" class="bg-light-50 border-dark-400 border-b-dark-800 border-1 rounded-xl">
    <button class="bg-black p-2 w-20 text-gray-400" @click="addNote">Add</button>
  </div>
</template>

<style scoped>
</style>
