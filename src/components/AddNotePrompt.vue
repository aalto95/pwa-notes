<script setup lang="ts">
import { useStore } from "../store/store";
import { onMounted, ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const store = useStore();
const note = ref({
  title: "",
  text: "",
});

function closePrompt() {
  note.value = {
    title: "",
    text: "",
  };
  store.toggleAddNotePrompt(false);
}

function addNote() {
  store.addNote(note.value);
  closePrompt();
}

const titleField = ref<HTMLInputElement | null>(null);
const textField = ref<HTMLInputElement | null>(null);

onMounted(() => {
  titleField.value?.focus();
});

function focusTextField() {
  textField.value?.focus();
}
</script>

<template>
  <div
    class="fixed w-screen h-screen bg-black/[.6] z-10 flex justify-center items-center"
    @click.self="closePrompt"
  >
    <div
      class="w-100 flex flex-col justify-between items-center bg-light-300 mx-2 p-2 rounded-xl"
    >
      <div class="flex justify-end w-full">
        <button @click="closePrompt()" class="">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
      <div class="flex w-full flex-col gap-2">
        <input
          v-model="note.title"
          @keyup.enter="focusTextField()"
          :ref="(el: any) => { titleField = el }"
          placeholder="Title"
          type="text"
          class="border-dark-400 border-b-dark-800 p-2 outline-none mr-2 rounded-lg w-full"
        />
        <textarea
          v-model="note.text"
          @keyup.enter="addNote()"
          :ref="(el: any) => { textField = el }"
          class="border-dark-400 border-b-dark-800 p-2 outline-none mr-2 rounded-lg w-full h-40"
          placeholder="Text"
          type="text"
        />
        <div class="flex justify-end">
          <button
            class="w-20 h-12 text-white font-bold bg-indigo-700 rounded-lg"
            @click="addNote()"
            :disabled="!note.title && !note.text"
            :class="
              note.title && note.text
                ? 'hover:bg-indigo-800'
                : 'bg-indigo-400 cursor-not-allowed'
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
