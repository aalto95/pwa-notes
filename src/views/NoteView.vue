<template>
  <div v-if="note" class="flex w-full flex-col p-2 gap-2">
    <h1 class="text-3xl font-bold">{{ id ? "Edit" : "Add" }} note</h1>
    <input
      type="text"
      class="text-xl rounded-lg outline-none border-2 border-dark-400 p-2"
      v-model="note.title"
      :ref="(el: any) => { titleField = el }"
      @keyup.enter="focusTextField()"
    />
    <textarea
      class="w-full h-96 bg-gray-100 rounded-lg p-2 outline-none"
      v-model="note.text"
      :ref="(el: any) => { textField = el }"
    />
    <div class="flex justify-end gap-2">
      <button
        class="rounded-lg bg-gray-100 hover:bg-gray-200 w-20 h-12"
        @click="cancel()"
      >
        Cancel
      </button>
      <button
        class="rounded-lg w-20 h-12 text-white"
        @click="id ? editNote() : addNote()"
        :disabled="!note.title && !note.text"
        :class="
          note.title && note.text
            ? 'bg-indigo-500 hover:bg-indigo-600'
            : 'bg-indigo-300 cursor-not-allowed'
        "
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Note } from "../models/Note";
import router from "../router";
import { useStore } from "../store/store";

const route = useRoute();
const store = useStore();

const id = route.params.id;
let note;

if (id) {
  note = store.getNoteById(id.toString());
} else {
  note = ref({
    title: "",
    text: "",
  });
}

const titleField = ref<HTMLInputElement | null>(null);
const textField = ref<HTMLInputElement | null>(null);

function editNote() {
  store.editNote(note as Note);
  router.push("/");
}

function addNote() {
  store.addNote(note.value as Partial<Note>);
  router.push("/");
}

function cancel() {
  router.push("/");
}

function focusTextField() {
  textField.value?.focus();
}

onMounted(() => {
  titleField.value?.focus();
});
</script>

<style scoped></style>
