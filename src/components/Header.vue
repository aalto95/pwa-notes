<template>
  <header
    v-if="!store.dragAndDropIsActive"
    class="w-full h-30 flex justify-center items-center bg-black text-white"
  >
    <h1 class="text-xl">Notes App (Use Drap And Drop)</h1>
  </header>
  <div
    v-if="store.dragAndDropIsActive"
    @drop="handleDeleteDrop($event)"
    @dragover="allowDrop($event)"
    class="w-full h-15 flex justify-center items-center bg-red-100 border-2 border-dashed border-red-300"
  >
    Delete
  </div>
  <div
    v-if="store.dragAndDropIsActive"
    @drop="handlePinDrop($event)"
    @dragover="allowDrop($event)"
    class="w-full h-15 flex justify-center items-center bg-yellow-100 border-2 border-dashed border-yellow-300"
  >
    Pin / Unpin
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/store";

const store = useStore();

function handleDeleteDrop(ev) {
  ev.preventDefault();
  console.log(ev);
  const noteReference = JSON.parse(ev.dataTransfer.getData("text/plain"));
  noteReference.pinned
    ? store.deletePinnedNote(noteReference.id)
    : store.deleteNote(noteReference.id);
}

function handlePinDrop(ev) {
  ev.preventDefault();
  console.log(ev);
  const noteReference = JSON.parse(ev.dataTransfer.getData("text/plain"));
  noteReference.pinned
    ? store.unpinNote(noteReference)
    : store.pinNote(noteReference);
}

function allowDrop(ev) {
  ev.preventDefault();
}
</script>

<style scoped></style>
