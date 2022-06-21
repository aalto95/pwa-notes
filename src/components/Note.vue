<script setup>
import { useStore } from '../store/store'

import {ref, nextTick} from 'vue'
const props = defineProps({
  note: Object,
  pinned: Boolean
})

const store = useStore()

const downX = ref(0)
const upX = ref(0)
const isCurrentlyTouched = ref(false)
const widthClass = ref('w-0')
const inputWidthClass = ref('w-0')
const editMode = ref(false)
const focusMe = ref(null)

function listenToMouseDown(e) {
  isCurrentlyTouched.value = true
  downX.value = e.clientX
}

function listenToMouseUp(e) {
  isCurrentlyTouched.value = false
  upX.value = e.clientX
}

function listenToMouseMove(e) {
  if (isCurrentlyTouched.value) {
    if (downX.value - e.clientX > 50) {
      widthClass.value = 'w-32'
    } else if (e.clientX - downX.value > 50) {
      widthClass.value = 'w-0'
    }
  }
}

function listenToTouchStart(e) {
  isCurrentlyTouched.value = true
  downX.value = e.touches[0].clientX
}

function listenToTouchEnd(e) {
  isCurrentlyTouched.value = false
  downX.value = e.changedTouches[0].clientX
}

function listenToTouchMove(e) {
  if (isCurrentlyTouched.value) {
    if (downX.value - e.changedTouches[0].clientX  > 50) {
      widthClass.value = 'w-32'
    } else if (e.changedTouches[0].clientX  - downX.value > 50) {
      widthClass.value = 'w-0'
    }
  }
}

function deleteNote() {
  store.deleteNote(props.note.id)
}

function pinNote() {
  store.pinNote(props.note)
}

function unpinNote() {
  store.unpinNote(props.note)
}

function deletePinnedNote() {
  store.deletePinnedNote(props.note.id)
}

function editPinnedNote() {
  store.editPinnedNote(props.note)
}

function editNote() {
  store.editNote(props.note)
}

function editModeOff() {
  editMode.value = false
  inputWidthClass.value = 'w-0'
  if (props.pinned) {
    editPinnedNote()
  } else {
    editNote()
  }
}

function editModeOn() {
  editMode.value = true
  widthClass.value = 'w-0'
  inputWidthClass.value = 'w-48'
  isCurrentlyTouched.value = false
  focusMe.value.focus()
}

</script>

<template>
  <div class="flex touch-none">
    <div
      class="bg-gray-100 w-screen flex p-2" 
      @mousemove="listenToMouseMove"
      @mousedown="listenToMouseDown"
      @mouseleave="listenToMouseUp"
      @mouseup="listenToMouseUp"
      @touchstart="listenToTouchStart"
      @touchend="listenToTouchEnd"
      @touchmove="listenToTouchMove"
    >
      <p class="translate-x-12 w-full text-left break-all" v-if="!editMode">{{note.text}}</p>
      <input
        type="text"
        :ref="(el) => { focusMe = el }"
        v-model="props.note.text"
        class="outline-0"
        :class="[inputWidthClass]"
        @focusout="editModeOff()"
      >
    </div>
    <button class=" duration-500 bg-red-500 text-white select-none" :class="[widthClass]" @click="props.pinned ? deletePinnedNote() : deleteNote()">
      Delete
    </button>
    <button class=" duration-500 bg-yellow-500 text-white select-none" :class="[widthClass]" @click="props.pinned ? unpinNote() : pinNote()">
      {{props.pinned ? 'Unpin' : 'Pin'}}
    </button>
    <button class=" duration-500 bg-green-500 text-white select-none" :class="[widthClass]" @click="editModeOn()">
      Edit
    </button>
  </div>
</template>

<style scoped>
</style>
