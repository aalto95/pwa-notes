<template>
  <div class="mt-15">
    <PinnedNotes />
    <Notes />
  </div>
  <AddNoteButton />
</template>

<script setup lang="ts">
import Notes from "../components/Notes.vue";
import PinnedNotes from "../components/PinnedNotes.vue";
import AddNoteButton from "../components/AddNoteButton.vue";
</script>

<style scoped></style>
