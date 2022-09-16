<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./store/store";

const store = useStore();

onMounted(() => {
  store.getNotes();
});
</script>

<template>
  <RouterView />
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

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  display: none;
}
</style>
