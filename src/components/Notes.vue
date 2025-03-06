<script setup lang="ts">
import Note from '@/components/Note.vue';
import { useStore } from '@/store/store';
import { ref } from 'vue';
import draggable from 'vuedraggable';

const store = useStore();
const drag = ref(false);

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};

function dragEnd() {
  localStorage.setItem('notes', JSON.stringify(store.notes));
  drag.value = false;
}
</script>

<template>
  <draggable
    class="w-screen overflow-x-hidden list-group"
    :component-data="{
      tag: 'ul',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="store.notes"
    v-bind="dragOptions"
    @start="drag = true"
    @end="dragEnd()"
    item-key="id"
    :delay="100"
  >
    <template #item="{ element }">
      <Note :note="element" :key="element.id" />
    </template>
  </draggable>
</template>

<style scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}

.list-group-item i {
  cursor: pointer;
}
</style>
