<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store/store";
import Note from "./Note.vue";

const store = useStore();

onMounted(() => {
  store.getNotes();
});

function handleDrop(ev) {
  console.log(data);
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
}

function allowDrop(ev) {
  console.log(ev);
  ev.preventDefault();
}

function handleDrag(e) {
  console.log(e);
  e.preventDefault();
  e.dataTransfer.setData("text", "");
}
</script>

<template>
  <div class="w-screen overflow-x-hidden">
    <Note v-for="note in store.notes" :note="note" :key="note.id" />
  </div>
</template>

<style scoped></style>
