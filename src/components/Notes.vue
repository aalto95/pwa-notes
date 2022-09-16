<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";

const store = useStore();
</script>

<template>
  <div class="w-screen overflow-x-hidden">
    <Note v-for="note in store.notes" :note="note" :key="note.id" />
  </div>
</template>

<style scoped></style>
