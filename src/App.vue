<script setup>
import Notes from './components/Notes.vue'
import AddNote from './components/AddNote.vue'
</script>

<template>
  <div class="container">
    <Notes msg="Hello Vue 3 + Vite" />
    <AddNote />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; 
  overflow-x: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
