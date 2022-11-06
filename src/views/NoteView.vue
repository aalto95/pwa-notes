<template>
  <div v-if="note" class="flex w-full flex-col p-2 gap-2 mt-15">
    <h1 class="text-3xl font-bold">{{ id ? "Edit" : "Add" }} note</h1>
    <input
      type="text"
      class="text-xl rounded-lg outline-none border-2 border-dark-400 p-2"
      v-model="note.title"
      :ref="(el: any) => { titleField = el }"
      @keyup.enter="focusTextField()"
      placeholder="Title"
    />
    <textarea
      class="text-xl w-full h-96 bg-gray-100 rounded-lg p-2 outline-none"
      v-model="note.text"
      :ref="(el: any) => { textField = el }"
      placeholder="Text"
    />
    <input type="file" @change="setFile" />
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
import { db } from "../db/dexie";
import { Note } from "../models/Note";
import router from "../router";
import { useStore } from "../store/store";

const route = useRoute();
const store = useStore();

const id = route.params.id;
let note;
const file = ref<File | null>(null);

function setFile(event: Event) {
  const target = event.target as HTMLInputElement;
  file.value = target.files![0];
}

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
  if (file.value) {
    const reader = new FileReader();
    reader.readAsBinaryString(file.value);
    reader.onload = (e) => {
      let bits = e.target?.result;
      const id = self.crypto.randomUUID();
      const file = db.files.add({
        data: bits as string,
        id,
        createdAt: new Date(),
      });
      note.value.imageId = id;
      store.addNote(note.value);
    };
  } else {
    store.addNote(note.value);
  }
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
