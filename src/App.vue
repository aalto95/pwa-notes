<script setup lang="ts">
import Notes from "./components/Notes.vue";
import PinnedNotes from "./components/PinnedNotes.vue";
import AddNoteButton from "./components/AddNoteButton.vue";
import AddNotePrompt from "./components/AddNotePrompt.vue";
import { useStore } from "./store/store";
import Header from "./components/Header.vue";

const store = useStore();
</script>

<template>
  <Header />
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
  overflow-x: hidden;
}
</style>
