<script setup lang="ts">
import Notes from "./components/Notes.vue";
import PinnedNotes from "./components/PinnedNotes.vue";
import AddNoteButton from "./components/AddNoteButton.vue";
import AddNotePrompt from "./components/AddNotePrompt.vue";
import { useStore } from "./store/store";

const store = useStore();

function handleDrop(ev) {
  ev.preventDefault();
  console.log(ev);
  const noteReference = JSON.parse(ev.dataTransfer.getData("text/plain"));
  noteReference.pinned
    ? store.deletePinnedNote(noteReference.id)
    : store.deleteNote(noteReference.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}
</script>

<template>
  <div
    v-if="store.dragAndDropIsActive"
    @drop="handleDrop($event)"
    @dragover="allowDrop($event)"
    class="w-full h-30 flex justify-center items-center bg-red-100"
  >
    Delete
  </div>
  <div v-if="!store.dragAndDropIsActive" class="w-full h-30"></div>
  <PinnedNotes />
  <Notes />
  <AddNotePrompt v-if="store.addNotePromptIsActive" />
  <AddNoteButton />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
