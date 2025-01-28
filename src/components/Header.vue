<template>
  <header
    class="w-full h-15 text-white flex justify-between items-center fixed z-10 bg-black px-4"
  >
    <router-link to="/">
      <h1 class="text-xl font-bold">Notes</h1>
    </router-link>
    <span class="flex gap-4">
      <button
        class="bg-light-500 rounded-full w-10 h-10 flex justify-center items-center"
        @click="toggleDarkMode()"
      >
        <SunIcon v-if="store.darkMode" class="h-6 w-6 text-black" />
        <MoonIcon v-if="!store.darkMode" class="h-6 w-6 text-black" />
      </button>
      <button
        class="bg-light-500 rounded-full w-10 h-10 flex justify-center items-center"
        @click="openNewNoteView()"
      >
        <PlusIcon class="h-6 w-6 text-black" />
      </button>
    </span>
  </header>
</template>

<script setup lang="ts">
import router from "../router";
import { PlusIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { useStore } from "../store/store";

const store = useStore();

function openNewNoteView() {
  router.push("/note");
}

function toggleDarkMode() {
  localStorage.setItem("darkMode", String(!store.darkMode));
  document.documentElement.classList.toggle("my-app-dark");
  store.darkMode = !store.darkMode;
}
</script>

<style scoped></style>
