<script setup lang="ts">
import { useStore } from "../store/store";
import { ref } from "vue";
import { Note } from "../models/Note";
import {
  TrashIcon,
  StarIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/vue/24/outline";

interface Props {
  note: Note;
  pinned?: boolean;
}

const props = defineProps<Props>();

const store = useStore();

const isActionBarActive = ref(false);

function deleteNote() {
  store.deleteNote(props.note.id);
}

function pinNote() {
  store.pinNote(props.note);
}

function unpinNote() {
  store.unpinNote(props.note);
}

function deletePinnedNote() {
  store.deletePinnedNote(props.note.id);
}

function handleDrag(ev) {
  ev.preventDefault();
}

function handleDragStart(ev) {
  ev.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ ...props.note, pinned: props.pinned })
  );
  store.toggleDragAndDrop(true);
}

function handleDragEnd(ev) {
  ev.preventDefault();
  store.toggleDragAndDrop(false);
}

function openActions() {
  isActionBarActive.value = true;
}

function closeActions() {
  isActionBarActive.value = false;
}
</script>

<template>
  <div
    class="flex touch-none w-full justify-between items-center h-12"
    draggable="true"
    @dragstart="handleDragStart($event)"
    @drag="handleDrag($event)"
    @dragend="handleDragEnd($event)"
  >
    <router-link
      class="flex p-2 items-center h-full"
      :to="{ name: 'note', params: { id: note.id } }"
    >
      <p
        class="translate-x-12 w-full text-left break-all w-40 sm:w-60 lg:w-80 xl:w-100 truncate whitespace-nowrap select-none"
      >
        {{ note.title }}
      </p>
    </router-link>
    <div
      class="flex transform absolute right-0 h-12 transition-all duration-300"
      :class="
        isActionBarActive ? 'translate-x-0' : 'translate-x-36 md:translate-x-72'
      "
    >
      <button
        class="w-12 flex justify-center items-center"
        @click="isActionBarActive ? closeActions() : openActions()"
      >
        <ChevronRightIcon class="h-6 w-6" v-if="isActionBarActive" />
        <ChevronLeftIcon v-else class="h-6 w-6" />
      </button>
      <button
        class="duration-500 bg-red-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
        @click="props.pinned ? deletePinnedNote() : deleteNote()"
      >
        <TrashIcon class="h-6 w-6" />
      </button>
      <button
        class="duration-500 bg-yellow-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
        @click="props.pinned ? unpinNote() : pinNote()"
      >
        <StarIcon v-if="props.pinned" class="h-6 w-6" />
        <StarIconOutline v-else class="h-6 w-6" />
      </button>
      <router-link
        :to="{ name: 'note', params: { id: note.id } }"
        class="duration-500 bg-green-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
      >
        <PencilIcon class="h-5 w-5" />
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
