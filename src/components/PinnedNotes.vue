<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";
import draggable from "vuedraggable";
import { ref } from "vue";

const store = useStore();
const drag = ref(false);
</script>

<template>
  <draggable
    class="w-screen overflow-x-hidden border-b-light-900 mb-2 pb-2 border-b-width-1px"
    v-if="store.pinnedNotes.length"
    v-model="store.pinnedNotes"
    item-key="id"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }">
      <Note :note="element" :pinned="true" />
    </template>
  </draggable>
</template>

<style scoped></style>
