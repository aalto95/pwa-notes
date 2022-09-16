<template>
  <header class="w-full h-15 text-white flex">
    <div v-if="store.dragAndDropIsActive" class="flex w-full">
      <div
        @drop="handleDeleteDrop($event)"
        @dragover="allowDrop($event)"
        class="w-1/2 h-15 flex justify-center items-center bg-red-100 border-2 border-dashed border-red-300"
      >
        <p class="text-red-500">Delete</p>
      </div>
      <div
        @drop="handlePinDrop($event)"
        @dragover="allowDrop($event)"
        class="w-1/2 h-15 flex justify-center items-center bg-yellow-100 border-2 border-dashed border-yellow-300"
      >
        <p class="text-yellow-500">Pin / Unpin</p>
      </div>
    </div>
    <h1
      v-else
      class="text-xl bg-black w-full h-full flex justify-center items-center"
    >
      Notes App (With Drag And Drop)
    </h1>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "../store/store";

const store = useStore();

function handleDeleteDrop(ev) {
  ev.preventDefault();
  const noteReference = JSON.parse(ev.dataTransfer.getData("text/plain"));
  noteReference.pinned
    ? store.deletePinnedNote(noteReference.id)
    : store.deleteNote(noteReference.id);
}

function handlePinDrop(ev) {
  ev.preventDefault();
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
