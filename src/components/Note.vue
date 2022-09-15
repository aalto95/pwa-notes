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

const isCurrentlyTouched = ref(false);
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
  widthClass.value = "w-0";
  inputWidthClass.value = "w-48";
  isCurrentlyTouched.value = false;
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
  isCurrentlyTouched.value = true;
  widthClass.value = "w-48";
}

function closeActions() {
  isCurrentlyTouched.value = false;
  widthClass.value = "w-0";
}
</script>

<template>
  <div
    class="flex touch-none"
    draggable="true"
    @dragstart="handleDragStart($event)"
    @drag="handleDrag($event)"
    @dragend="handleDragEnd($event)"
  >
    <div class="w-screen flex p-2 h-12 items-center">
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
    <div class="flex items-center" v-if="widthClass === 'w-0'">
      <!-- <img src="../assets/pin.svg" alt="pin" class="w-4 h-4 select-none" /> -->
      <button class="bg-green-100 h-full w-32" @click="openActions()">
        <p>Actions</p>
      </button>
    </div>
    <button
      class="duration-500 bg-green-100 text-white select-none text-black"
      :class="[widthClass]"
      @click="closeActions()"
    >
      Close
    </button>
    <button
      class="duration-500 bg-red-500 text-white select-none"
      :class="[widthClass]"
      @click="props.pinned ? deletePinnedNote() : deleteNote()"
    >
      Delete
    </button>
    <button
      class="duration-500 bg-yellow-500 text-white select-none"
      :class="[widthClass]"
      @click="props.pinned ? unpinNote() : pinNote()"
    >
      {{ props.pinned ? "Unpin" : "Pin" }}
    </button>
    <button
      class="duration-500 bg-green-500 text-white select-none"
      :class="[widthClass]"
      @click="editModeOn()"
    >
      Edit
    </button>
  </div>
</template>

<style scoped></style>
