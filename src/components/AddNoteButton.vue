<script setup lang="ts">
import { useStore } from "../store/store";
import { PlusIcon } from "@heroicons/vue/24/solid";

const store = useStore();

function toggleAddNotePrompt() {
  store.toggleAddNotePrompt(true);
}
</script>

<template>
  <div class="fixed bottom-0 right-0 m-4">
    <button
      class="bg-light-500 rounded-full w-10 h-10 flex justify-center items-center"
      @click="toggleAddNotePrompt()"
    >
      <PlusIcon class="h-6 w-6 text-black" />
    </button>
  </div>
</template>

<style scoped></style>
