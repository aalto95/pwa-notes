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

const downX = ref(0);
const upX = ref(0);
const isCurrentlyTouched = ref(false);
const widthClass = ref("w-0");
const inputWidthClass = ref("w-0");
const editMode = ref(false);
const editField = ref<HTMLInputElement | null>(null);

function listenToMouseDown(e) {
  isCurrentlyTouched.value = true;
  downX.value = e.clientX;
}

function listenToMouseUp(e) {
  isCurrentlyTouched.value = false;
  upX.value = e.clientX;
}

function listenToMouseMove(e) {
  if (isCurrentlyTouched.value) {
    if (downX.value - e.clientX > 50) {
      widthClass.value = "w-32";
    } else if (e.clientX - downX.value > 50) {
      widthClass.value = "w-0";
    }
  }
}

function listenToTouchStart(e) {
  isCurrentlyTouched.value = true;
  downX.value = e.touches[0].clientX;
}

function listenToTouchEnd(e) {
  isCurrentlyTouched.value = false;
  downX.value = e.changedTouches[0].clientX;
}

function listenToTouchMove(e) {
  if (isCurrentlyTouched.value) {
    if (downX.value - e.changedTouches[0].clientX > 50) {
      widthClass.value = "w-32";
    } else if (e.changedTouches[0].clientX - downX.value > 50) {
      widthClass.value = "w-0";
    }
  }
}

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
    JSON.stringify({ id: props.note.id, pinned: props.pinned })
  );
  store.toggleDragAndDrop(true);
}
</script>

<template>
  <div
    class="flex touch-none"
    draggable="true"
    @dragstart="handleDragStart($event)"
    @drag="handleDrag($event)"
  >
    <div
      class="w-screen flex p-2 h-12 items-center"
      @mousemove="listenToMouseMove"
      @mousedown="listenToMouseDown"
      @mouseleave="listenToMouseUp"
      @mouseup="listenToMouseUp"
      @touchstart="listenToTouchStart"
      @touchend="listenToTouchEnd"
      @touchmove="listenToTouchMove"
    >
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
      class="flex items-center w-4 mr-2"
      v-if="props.pinned && widthClass === 'w-0'"
    >
      <img src="../assets/pin.svg" alt="pin" class="w-4 h-4 select-none" />
    </div>
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
