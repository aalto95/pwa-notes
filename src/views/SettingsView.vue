<script setup lang="ts">
import { Note } from '@/models/Note';
import { useStore } from '@/store/store';
import { DocumentArrowDownIcon, TrashIcon } from '@heroicons/vue/24/solid';
import {
  Button,
  ConfirmDialog,
  FileUpload,
  FileUploadSelectEvent,
  useConfirm
} from 'primevue';
import { useToast } from 'primevue/usetoast';

const store = useStore();
const toast = useToast();
const confirm = useConfirm();

function exportNotes() {
  const notes = localStorage.getItem('notes');
  if (notes && notes !== '[]' && notes !== 'null') {
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
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
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
    const jsonObject: Note[] = eval(`(${jsContent})`);
    const jsonString = JSON.stringify(jsonObject);
    localStorage.setItem('notes', jsonString);
    showNotesImportedToast();
    store.notes = jsonObject;
  };

  reader.readAsText(file);
}

function deleteNotes() {
  const notes = localStorage.getItem('notes');
  if (notes && notes !== '[]' && notes !== 'null') {
    confirm.require({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        localStorage.removeItem('notes');
        store.notes = [];
        toast.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'All notes were deleted',
          life: 3000
        });
      },
      reject: () => {}
    });
  } else {
    showNotesNotFoundToast();
  }
}

function showNotesNotFoundToast() {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Notes not found',
    life: 3000
  });
}

function showNotesImportedToast() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Notes were successfully imported',
    life: 3000
  });
}
</script>

<template>
  <div class="mt-15 flex w-full flex-col gap-4 p-4">
    <p>
      Export all notes in <code>json</code> format. All linked assets will not
      be exported.
    </p>
    <Button @click="exportNotes">
      Export notes <DocumentArrowDownIcon class="h-6 w-6" />
    </Button>
    <p>Import your notes from another device in <code>json</code> format.</p>
    <FileUpload
      style="width: 100%"
      mode="basic"
      customUpload
      accept="application/json"
      :maxFileSize="1000000"
      :auto="true"
      chooseLabel="Import notes"
      @select="importNotes"
    />
    <p>Delete all notes</p>
    <Button @click="deleteNotes">
      Delete notes <TrashIcon class="h-6 w-6" />
    </Button>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
