<script setup lang="ts">
import { useStore } from "../store/store";
import { onMounted, ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const store = useStore();
const note = ref("");

function closePrompt() {
  note.value = "";
  store.toggleAddNotePrompt(false);
}

function addNote() {
  store.addNote(note.value);
  closePrompt();
}

const inputField = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputField.value?.focus();
});
</script>

<template>
  <div
    class="fixed w-screen h-screen bg-black/[.6] z-10 flex justify-center items-center"
    @click.self="closePrompt"
  >
    <div
      class="h-30 w-100 flex flex-col justify-between items-center bg-light-300 mx-2 p-2 rounded-xl"
    >
      <div class="flex justify-end w-full">
        <button @click="closePrompt()" class="">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
      <div class="flex w-full">
        <input
          v-model="note"
          @keyup.enter="addNote()"
          :ref="(el: any) => { inputField = el }"
          placeholder="Add Note"
          type="text"
          class="border-dark-400 border-b-dark-800 p-2 outline-none mr-2 rounded-lg w-full"
        />
        <button
          class="w-20 text-white font-bold bg-indigo-700 rounded-lg"
          @click="addNote()"
          :disabled="!note"
          :class="
            note ? 'hover:bg-indigo-800' : 'bg-indigo-400 cursor-not-allowed'
          "
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
