<script setup lang="ts">
import { useStore } from "../store/store";
import Note from "./Note.vue";
import draggable from "vuedraggable";
import { ref } from "vue";

const store = useStore();
const drag = ref(false);
const dragOptions = {
  animation: 0,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
};
</script>

<template>
  <draggable
    v-model="store.notes"
    item-key="id"
    class="w-screen overflow-x-hidden"
    @start="drag = true"
    @end="drag = false"
    :scroll-sensitivity="200"
    :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
    v-bind="dragOptions"
  >
    <template #item="{ element }">
      <Note :note="element" :key="element.id" />
    </template>
  </draggable>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>
