<template>
  <Header />
  <PinnedNotes />
  <Notes />
  <AddNotePrompt v-if="store.addNotePromptIsActive" />
  <AddNoteButton />
</template>

<script setup lang="ts">
import Notes from "../components/Notes.vue";
import PinnedNotes from "../components/PinnedNotes.vue";
import AddNoteButton from "../components/AddNoteButton.vue";
import AddNotePrompt from "../components/AddNotePrompt.vue";
import { useStore } from "../store/store";
import Header from "../components/Header.vue";

const store = useStore();
</script>

<style scoped></style>
