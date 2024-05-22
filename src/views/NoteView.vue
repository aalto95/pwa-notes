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
    <div v-if="imageSrc">
      <p>Loaded image</p>
      <img :src="imageSrc" alt="loaded-img" />
    </div>
    <div class="flex justify-end gap-2">
      <Button variant="secondary" @click="cancel()"> Cancel </Button>
      <Button
        @click="id ? editNote() : addNote()"
        :disabled="!note.title || !note.text"
      >
        Save
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { db } from "../db/dexie";
import { Note } from "../models/Note";
import router from "../router";
import { useStore } from "../store/store";
import { Button } from "vue-solitude";

const route = useRoute();
const store = useStore();

const id = route.params.id;
let note;
const file = ref<File | null>(null);
const imageSrc = ref("");

function setFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const fr = new FileReader();
  fr.onload = function (event) {
    imageSrc.value = event.target?.result as string;
  };
  fr.readAsDataURL(target.files![0]);
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
      note.imageId = id;
      store.editNote(note as Note);
    };
  } else {
    store.editNote(note as Note);
  }
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
        id,
        data: bits as string,
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

function loadImage() {
  useObservable(
    liveQuery(async () => {
      return await db.files
        .where("id")
        .equals(note.imageId)
        .first((file) => {
          imageSrc.value = "data:image/jpeg;base64," + btoa(file!.data);
        });
    }) as any
  );
}

onMounted(() => {
  titleField.value?.focus();
  loadImage();
});
</script>

<style scoped></style>
