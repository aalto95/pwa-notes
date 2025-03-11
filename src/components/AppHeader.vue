<script setup lang="ts">
import router from '@/router';
import { useStore } from '@/store/store';
import {
  Cog8ToothIcon,
  MoonIcon,
  PlusIcon,
  SunIcon
} from '@heroicons/vue/24/solid';
import Button from 'primevue/button';
import { RouterLink } from 'vue-router';

const store = useStore();

function openNewNoteView() {
  router.push('/note');
}

function toggleDarkMode() {
  localStorage.setItem('darkMode', String(!store.darkMode));
  document.documentElement.classList.toggle('my-app-dark');
  store.darkMode = !store.darkMode;
}
</script>

<template>
  <header
    class="fixed z-10 flex h-15 w-full items-center justify-between bg-black px-4 text-white"
  >
    <RouterLink to="/" class="flex items-center gap-2">
      <img src="/favicon-32x32.png" alt="Logo" />
      <h1 class="text-xl font-bold">Notes</h1>
    </RouterLink>
    <span class="flex gap-4">
      <RouterLink to="/settings">
        <Button rounded class="h-10 w-10">
          <Cog8ToothIcon></Cog8ToothIcon> </Button
      ></RouterLink>

      <Button rounded class="h-10 w-10" @click="toggleDarkMode()">
        <SunIcon v-if="store.darkMode" class="h-6 w-6 text-black" />
        <MoonIcon v-if="!store.darkMode" class="h-6 w-6 text-black" />
      </Button>
      <Button rounded class="h-10 w-10" @click="openNewNoteView()">
        <PlusIcon class="h-6 w-6 text-black" />
      </Button>
    </span>
  </header>
</template>
