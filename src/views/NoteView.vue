<script setup lang="ts">
import Button from "primevue/button";
import FileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useErrorHandler } from "@/composables/useErrorHandler";
import { useImageCache } from "@/composables/useImageCache";
import { db } from "@/db/dexie";
import type { Note } from "@/models/Note";
import router from "@/router";
import { useStore } from "@/store/store";
import { base64ToDataUrl, compressImage, fileToBase64, isValidImageFile } from "@/utils/imageUtils";

const route = useRoute();
const store = useStore();
const { loadImage } = useImageCache();
const { handleFileError, handleStorageError } = useErrorHandler();

const id = route.params.id;
const note = ref<Note | Partial<Note> | undefined>();
const file = ref<File | null>(null);
const imageSrc = ref("");

async function setFile(event: FileUploadSelectEvent) {
	const selectedFile = event.files[0];

	if (!isValidImageFile(selectedFile)) {
		console.error("Invalid image file type");
		return;
	}

	try {
		// Compress the image to reduce size
		const compressedFile = await compressImage(selectedFile);
		file.value = compressedFile;

		// Show preview
		const imageData = await fileToBase64(compressedFile);
		imageSrc.value = base64ToDataUrl(imageData.data, imageData.mimeType);
	} catch (error) {
		handleFileError(error as Error, "Image processing");
	}
}

if (id) {
	note.value = store.getNoteById(id.toString());
} else {
	note.value = {
		title: "",
		text: "",
	};
}

const titleField = ref<HTMLInputElement | null>(null);
const textField = ref<HTMLInputElement | null>(null);

async function editNote() {
	try {
		if (file.value) {
			const imageData = await fileToBase64(file.value);
			const fileId = crypto.randomUUID();

			await db.files.add({
				id: fileId,
				data: imageData.data,
				mimeType: imageData.mimeType,
				createdAt: new Date(),
			});

			(note.value as Note).imageId = fileId;
		}

		store.editNote(note.value as Note);
		router.push("/");
	} catch (error) {
		handleStorageError(error as Error, "Note editing");
	}
}

async function addNote() {
	try {
		if (file.value) {
			const imageData = await fileToBase64(file.value);
			const fileId = crypto.randomUUID();

			await db.files.add({
				id: fileId,
				data: imageData.data,
				mimeType: imageData.mimeType,
				createdAt: new Date(),
			});

			(note.value as Partial<Note>).imageId = fileId;
		}

		store.addNote(note.value as Omit<Note, "id">);
		router.push("/");
	} catch (error) {
		handleStorageError(error as Error, "Note creation");
	}
}

function cancel() {
	router.push("/");
}

async function loadImageData() {
	if (!(note.value as Note)?.imageId) {
		return;
	}

	try {
		const dataUrl = await loadImage((note.value as Note).imageId, async () => {
			const file = await db.files
				.where("id")
				.equals((note.value as Note).imageId)
				.first();

			if (!file) {
				throw new Error("Image file not found");
			}

			return base64ToDataUrl(file.data, file.mimeType);
		});

		imageSrc.value = dataUrl;
	} catch (error) {
		handleStorageError(error as Error, "Image loading");
	}
}

onMounted(() => {
	titleField.value?.focus();
	loadImageData();
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
