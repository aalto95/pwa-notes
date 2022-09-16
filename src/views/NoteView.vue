<template>
  <div v-if="note">
    <h1 class="text-xl">{{ note.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "../store/store";

const route = useRoute();
const store = useStore();

const id = route.params.id;
const note = store.getNoteById(id.toString());
</script>

<style scoped></style>
