<script setup lang="ts">
import { useStore } from "../store/store";
import { onMounted, ref } from "vue";
import { Note } from "../models/Note";
import {
  TrashIcon,
  StarIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/vue/24/outline";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db/dexie";

interface Props {
  note: Note;
  pinned?: boolean;
}

const props = defineProps<Props>();
const store = useStore();

const isActionBarActive = ref(false);
const isTextVisible = ref(false);
const imageSrc = ref<string>("");

function deleteNote() {
  store.deleteNote(props.note.id);
}

function pinNote() {
  store.pinNote(props.note);
}

function unpinNote() {
  store.unpinNote(props.note);
}

function deletePinnedNote() {
  store.deletePinnedNote(props.note.id);
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
  useObservable(
    liveQuery(async () => {
      return await db.files
        .where("id")
        .equals(props.note.imageId)
        .first((file) => {
          imageSrc.value = "data:image/jpeg;base64," + btoa(file.data);
        });
    })
  );
}

onMounted(() => {
  loadImage();
});
</script>

<template>
  <li
    class="flex w-full justify-between transform ease-in-out transition duration-500"
  >
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
              : 'translate-x-36 md:translate-x-72'
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
            @click="props.pinned ? deletePinnedNote() : deleteNote()"
          >
            <TrashIcon class="h-6 w-6" />
          </button>
          <button
            class="duration-500 bg-yellow-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
            @click="props.pinned ? unpinNote() : pinNote()"
          >
            <StarIcon v-if="props.pinned" class="h-6 w-6" />
            <StarIconOutline v-else class="h-6 w-6" />
          </button>
          <router-link
            :to="{ name: 'note', params: { id: note.id } }"
            class="duration-500 bg-green-500 text-white select-none w-12 md:w-24 flex justify-center items-center"
          >
            <PencilIcon class="h-5 w-5" />
          </router-link>
        </div>
      </div>
      <div v-if="isTextVisible">
        <p class="text-left break-words mx-4">
          {{ note.text }}
        </p>
        <img :src="imageSrc!" alt="" />
      </div>
    </div>
  </li>
</template>

<style scoped></style>
