<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";

const store = useStore();
</script>

<template>
  <ul class="w-screen overflow-x-hidden" v-auto-animate>
    <Note v-for="note in store.notes" :note="note" :key="note.id" />
  </ul>
</template>

<style scoped></style>
