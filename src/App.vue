<script setup>
import Notes from './components/Notes.vue'
import AddNote from './components/AddNote.vue'
</script>

<template>
  <Notes msg="Hello Vue 3 + Vite" />
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
