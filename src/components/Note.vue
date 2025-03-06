<script setup lang="ts">
import { db } from '@/db/dexie';
import { Note } from '@/models/Note';
import { useStore } from '@/store/store';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid';
import { liveQuery } from 'dexie';
import { onMounted, ref, watch } from 'vue';

interface Props {
  note: Note;
}

const props = defineProps<Props>();
const store = useStore();

const isActionBarActive = ref(false);
const isTextVisible = ref(false);
const imageSrc = ref<string>('');

function deleteNote() {
  store.deleteNote(props.note.id, props.note.imageId);
}

function openActions() {
  isActionBarActive.value = true;
}

function closeActions() {
  isActionBarActive.value = false;
}

function toggleText() {
  isTextVisible.value = !isTextVisible.value;
}

function loadImage() {
  liveQuery(async () => {
    return await db.files
      .where('id')
      .equals(props.note.imageId)
      .first((file) => {
        imageSrc.value = 'data:image/jpeg;base64,' + btoa(file!.data);
      });
  }).subscribe();
}

onMounted(() => {
  loadImage();
});

watch(
  () => props.note.imageId,
  () => {
    loadImage();
  }
);
</script>

<template>
  <li class="flex w-full justify-between cursor-move">
    <div class="flex flex-col h-full w-full justify-center">
      <div class="flex w-full min-h-12">
        <p
          class="flex w-8/12 items-center break-all select-none font-semi-bold ml-4"
        >
          {{ note.title }}
        </p>
        <div
          class="flex transform absolute right-0 h-12 transition-all duration-300"
          :class="
            isActionBarActive
              ? 'translate-x-0'
              : 'translate-x-24 md:translate-x-48'
          "
        >
          <button
            class="w-6 flex justify-center items-center"
            @click="toggleText()"
          >
            <ChevronDownIcon v-if="isTextVisible" class="h-6 w-6" />
            <ChevronUpIcon v-else class="h-6 w-6" />
          </button>
          <button
            class="w-12 flex justify-center items-center"
            @click="isActionBarActive ? closeActions() : openActions()"
          >
            <ChevronRightIcon class="h-6 w-6" v-if="isActionBarActive" />
            <ChevronLeftIcon v-else class="h-6 w-6" />
          </button>
          <button
            class="duration-500 bg-red-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
            @click="deleteNote()"
            :class="isActionBarActive ? 'opacity-100' : 'opacity-0'"
          >
            <TrashIcon class="h-6 w-6" />
          </button>
          <router-link
            :to="{ name: 'note', params: { id: note.id } }"
            class="duration-500 bg-green-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
            :class="isActionBarActive ? 'opacity-100' : 'opacity-0'"
          >
            <PencilIcon class="h-5 w-5" />
          </router-link>
        </div>
      </div>
      <div v-if="isTextVisible">
        <p class="text-left break-words mx-4">
          {{ note.text }}
        </p>
        <img :src="imageSrc" alt="image" v-if="imageSrc" />
      </div>
    </div>
  </li>
</template>

<style scoped></style>
