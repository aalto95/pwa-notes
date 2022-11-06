<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";

const store = useStore();
</script>

<template>
  <ul
    class="w-screen overflow-x-hidden border-b-light-900 mb-2 pb-2 border-b-width-1px pt-15"
    v-if="store.pinnedNotes.length"
    v-auto-animate
  >
    <Note
      v-for="pinnedNote in store.pinnedNotes"
      :note="pinnedNote"
      :key="pinnedNote.id"
      :pinned="true"
    />
  </ul>
</template>

<style scoped></style>
