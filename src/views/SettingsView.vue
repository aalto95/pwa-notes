<template>
  <div class="mt-15 w-full flex flex-col p-4 gap-4">
    <p>
      Export all notes in <code>json</code> format. All linked assets will not
      be exported.
    </p>
    <Button @click="exportNotes"
      >Export notes <DocumentArrowDownIcon class="w-6 h-6"
    /></Button>
    <p>Import your notes from another device in <code>json</code> format.</p>
    <FileUpload
      style="width: 100%"
      mode="basic"
      customUpload
      :maxFileSize="1000000"
      :auto="true"
      chooseLabel="Import notes"
      @select="importNotes"
    />
  </div>
</template>

<script setup lang="ts">
import { Note } from "@/models/Note";
import { DocumentArrowDownIcon } from "@heroicons/vue/24/solid";
import { Button, FileUpload, FileUploadSelectEvent } from "primevue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

function exportNotes() {
  let notes = localStorage.getItem("notes");
  if (notes && notes !== "[]" && notes !== "null") {
    const notesJson: Note[] = JSON.parse(notes);
    const notesJsonWithoutImageId = notesJson.map(
      ({ imageId, ...rest }) => rest
    );
    const stringifiedJsonWithoutImageId = JSON.stringify(
      notesJsonWithoutImageId,
      null,
      2
    );
    const blob = new Blob([stringifiedJsonWithoutImageId], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    showNotesNotFoundToast();
  }
}

function importNotes(event: FileUploadSelectEvent) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const jsContent = e.target?.result;

    const jsonObject = eval(`(${jsContent})`);
    const jsonString = JSON.stringify(jsonObject);
    localStorage.setItem("notes", jsonString);
  };

  reader.readAsText(file);
}

function showNotesNotFoundToast() {
  toast.add({
    severity: "error",
    summary: "Error",
    detail: "Notes not found",
    life: 3000,
  });
}
</script>

<style scoped></style>
