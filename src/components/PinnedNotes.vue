<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";

const store = useStore();
</script>

<template>
  <div
    class="w-screen overflow-x-hidden border-b-light-900 mb-2 pb-2 border-b-width-1px"
    v-if="store.pinnedNotes.length"
  >
    <Note
      v-for="pinnedNote in store.pinnedNotes"
      :note="pinnedNote"
      :key="pinnedNote.id"
      :pinned="true"
    />
  </div>
</template>

<style scoped></style>
