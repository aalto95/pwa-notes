<template>
  <div v-if="note" class="flex w-full flex-col p-2 gap-2 mt-15">
    <h1 class="text-3xl font-bold">{{ id ? "Edit" : "Add" }} note</h1>
    <InputText placeholder="Title" v-model="note.title" />
    <Textarea
      placeholder="Text"
      autoResize
      style="min-height: 300px; resize: none"
      multiline
      v-model="note.text"
    ></Textarea>
    <FileUpload
      @select="setFile"
      customUpload
      auto
      mode="basic"
      severity="secondary"
      accept="image/*"
      :maxFileSize="1000000"
      class="content-start"
    />
    <span v-if="imageSrc" class="flex justify-center">
      <img
        :src="imageSrc"
        alt="Image"
        class="shadow-md rounded-xl w-full sm:w-64 flex justify-center"
        style="filter: grayscale(100%)"
      />
    </span>

    <div class="flex justify-end gap-2">
      <Button @click="cancel()" label="Cancel" />
      <Button
        label="Save"
        @click="id ? editNote() : addNote()"
        :disabled="!note.title || !note.text"
      />
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
import { TextField } from "vue-solitude";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";

const route = useRoute();
const store = useStore();

const id = route.params.id;
let note;
const file = ref<File | null>(null);
const imageSrc = ref("");

function setFile(event: Event) {
  const fr = new FileReader();
  fr.onload = function (event) {
    imageSrc.value = event.target?.result as string;
  };
  fr.readAsDataURL(event.files[0]);
  file.value = event.files[0];
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
