<script setup>
import { useStore } from '../store/store'

import {ref} from 'vue'
const props = defineProps({
  note: String
})

const store = useStore()

const downX = ref(0)
const upX = ref(0)
const isCurrentlyTouched = ref(false)
const widthClass= ref('w-0')

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
  store.deleteNote(props.note)
}


</script>

<template>
  <div class="flex touch-none">
    <div
      class="bg-purple-500 w-screen flex p-2" 
      @mousemove="listenToMouseMove"
      @mousedown="listenToMouseDown"
      @mouseleave="listenToMouseUp"
      @mouseup="listenToMouseUp"
      @touchstart="listenToTouchStart"
      @touchend="listenToTouchEnd"
      @touchmove="listenToTouchMove"
    >
      <p class="translate-x-12">{{note}}</p>
    </div>
    <button class=" duration-500 bg-red-500 text-white" :class="[widthClass]" @click="deleteNote">
      Удалить
    </button>
  </div>
</template>

<style scoped>
</style>
