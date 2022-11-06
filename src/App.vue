<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./store/store";
import Header from "./components/Header.vue";

const store = useStore();

onMounted(async () => {
  store.getNotes();
});
</script>

<template>
  <Header />
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
  overflow-x: hidden;
}
</style>
