<template>
  <header
    class="w-full h-15 text-white flex justify-between items-center fixed z-10 bg-black px-4"
  >
    <router-link to="/">
      <h1 class="text-xl font-bold">Notes</h1>
    </router-link>
    <button
      class="bg-light-500 rounded-full w-10 h-10 flex justify-center items-center"
      @click="openNewNoteView()"
    >
      <PlusIcon class="h-6 w-6 text-black" />
    </button>
  </header>
</template>

<script setup lang="ts">
import router from "../router";
import { PlusIcon } from "@heroicons/vue/24/solid";

function openNewNoteView() {
  router.push("/note");
}
</script>

<style scoped></style>
