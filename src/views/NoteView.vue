<script setup lang="ts">
import { db } from '@/db/dexie';
import { Note } from '@/models/Note';
import router from '@/router';
import { useStore } from '@/store/store';
import { liveQuery } from 'dexie';
import Button from 'primevue/button';
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

const id = route.params.id;
const note = ref<Note | Partial<Note> | undefined>();
const file = ref<File | null>(null);
const imageSrc = ref('');

function setFile(event: FileUploadSelectEvent) {
  const fr = new FileReader();
  fr.onload = function (event) {
    imageSrc.value = event.target?.result as string;
  };
  fr.readAsDataURL(event.files[0]);
  file.value = event.files[0];
}

if (id) {
  note.value = store.getNoteById(id.toString());
} else {
  note.value = {
    title: '',
    text: ''
  };
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
        createdAt: new Date()
      });
      (note.value as Note).imageId = id;
      store.editNote(note.value as Note);
    };
  } else {
    store.editNote(note.value as Note);
  }
  router.push('/');
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
        createdAt: new Date()
      });
      (note.value as Partial<Note>).imageId = id;
      store.addNote(note.value as Omit<Note, 'id'>);
    };
  } else {
    store.addNote(note.value as Omit<Note, 'id'>);
  }
  router.push('/');
}

function cancel() {
  router.push('/');
}

function loadImage() {
  liveQuery(async () => {
    return await db.files
      .where('id')
      .equals((note.value as Note).imageId)
      .first((file) => {
        imageSrc.value = 'data:image/jpeg;base64,' + btoa(file!.data);
      });
  }).subscribe();
}

onMounted(() => {
  titleField.value?.focus();
  loadImage();
});
</script>

<template>
  <div v-if="note" class="mt-15 flex w-full flex-col gap-2 p-2">
    <h1 class="text-3xl font-bold">{{ id ? 'Edit' : 'Add' }} note</h1>
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
        class="flex w-full justify-center rounded-xl shadow-md sm:w-64"
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
