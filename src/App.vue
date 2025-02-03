<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { Toast } from "primevue";
import { useStore } from "./store/store";
import Header from "./components/Header.vue";
import Notification from "./components/Notification.vue";

const store = useStore();

onMounted(async () => {
  const localStorageDarkMode = localStorage.getItem("darkMode");
  if (!localStorageDarkMode) {
    localStorage.setItem("darkMode", "true");
    store.darkMode = true;
    document.documentElement.classList.add("my-app-dark");
  } else if (localStorageDarkMode === "true") {
    store.darkMode = true;
    document.documentElement.classList.add("my-app-dark");
  } else {
    store.darkMode = false;
  }
  store.getNotes();
});
</script>

<template>
  <Notification />
  <Toast />
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
  position: relative;
}
</style>
