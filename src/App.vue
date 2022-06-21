<script setup lang="ts">
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
  -webkit-tap-highlight-color: transparent; 
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
