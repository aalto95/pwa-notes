<script setup lang="ts">
import { useStore } from "../store/store";
import { ref } from "vue";
import { Note } from "../models/Note";

interface Props {
  note: Note;
  pinned?: boolean;
}

const props = defineProps<Props>();

const store = useStore();

const isActionBarActive = ref(false);
const widthClass = ref("w-0");
const inputWidthClass = ref("w-0");
const editMode = ref(false);
const editField = ref<HTMLInputElement | null>(null);

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

function editPinnedNote() {
  store.editPinnedNote(props.note);
}

function editNote() {
  store.editNote(props.note);
}

function editModeOff() {
  editMode.value = false;
  inputWidthClass.value = "w-0";
  if (props.pinned) {
    editPinnedNote();
  } else {
    editNote();
  }
}

function editModeOn() {
  editMode.value = true;
  isActionBarActive.value = false;
  inputWidthClass.value = "w-48";

  editField.value!.focus();
}

function handleDrag(ev) {
  ev.preventDefault();
  console.log(ev);
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
    <div class="flex p-2 items-center h-full">
      <p
        class="translate-x-12 w-full text-left break-all w-40 sm:w-60 lg:w-80 xl:w-100 truncate whitespace-nowrap select-none"
        v-if="!editMode"
      >
        {{ note.text }}
      </p>
      <input
        type="text"
        :ref="(el: any) => { editField = el }"
        v-model="props.note.text"
        class="outline-none"
        :class="[inputWidthClass]"
        @focusout="editModeOff()"
        @keyup.enter="editModeOff()"
      />
    </div>
    <div
      class="flex transform absolute right-0 h-12 transition-all duration-300"
      :class="
        isActionBarActive ? 'translate-x-0' : 'translate-x-54 md:translate-x-96'
      "
    >
      <button
        class="bg-green-100 w-18 md:w-32"
        @click="isActionBarActive ? closeActions() : openActions()"
      >
        <p>{{ isActionBarActive ? "Close" : "More" }}</p>
      </button>
      <button
        class="duration-500 bg-red-500 text-white select-none w-18 md:w-32"
        @click="props.pinned ? deletePinnedNote() : deleteNote()"
      >
        Delete
      </button>
      <button
        class="duration-500 bg-yellow-500 text-white select-none w-18 md:w-32"
        @click="props.pinned ? unpinNote() : pinNote()"
      >
        {{ props.pinned ? "Unpin" : "Pin" }}
      </button>
      <button
        class="duration-500 bg-green-500 text-white select-none w-18 md:w-32"
        @click="editModeOn()"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<style scoped></style>
