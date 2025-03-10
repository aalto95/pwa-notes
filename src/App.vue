<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { useStore } from '@/store/store';
import { Toast } from 'primevue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

const store = useStore();

onMounted(async () => {
  const localStorageDarkMode = localStorage.getItem('darkMode');
  if (!localStorageDarkMode) {
    localStorage.setItem('darkMode', 'true');
    store.darkMode = true;
    document.documentElement.classList.add('my-app-dark');
  } else if (localStorageDarkMode === 'true') {
    store.darkMode = true;
    document.documentElement.classList.add('my-app-dark');
  } else {
    store.darkMode = false;
  }
  store.getNotes();
});
</script>

<template>
  <main class="w-screen">
    <AppNotification />
    <Toast class="max-w-fit" />
    <AppHeader />
    <RouterView />
  </main>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
