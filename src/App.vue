<script setup>
import Notes from './components/Notes.vue'
import AddNote from './components/AddNote.vue'
import PinnedNotes from './components/PinnedNotes.vue'
</script>

<template>
  <PinnedNotes />
  <Notes />
  <AddNote />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
