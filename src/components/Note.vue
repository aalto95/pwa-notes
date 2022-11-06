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

function handleDrag(ev) {
  ev.preventDefault();
}

function handleDragStart(ev) {
  ev.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ ...props.note, pinned: props.pinned })
  );
  store.toggleDragAndDrop(true);
}

function handleDragEnd(ev) {
  ev.preventDefault();
  store.toggleDragAndDrop(false);
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

function handleTouch(event: TouchEvent) {
  let touches = event.changedTouches,
    first = touches[0],
    type = "";
  switch (event.type) {
    case "touchstart":
      type = "mousedown";
      break;
    case "touchmove":
      type = "mousemove";
      break;
    case "touchend":
      type = "mouseup";
      break;
    default:
      return;
  }
  const simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    first.screenX,
    first.screenY,
    first.clientX,
    first.clientY,
    false,
    false,
    false,
    false,
    0 /*left*/,
    null
  );
  first.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
}
</script>

<template>
  <li
    class="flex touch-none w-full justify-between"
    draggable="true"
    @dragstart="handleDragStart($event)"
    @drag="handleDrag($event)"
    @dragend="handleDragEnd($event)"
    @touchstart="handleTouch($event)"
    @touchcancel="handleTouch($event)"
    @touchend="handleTouch($event)"
    @touchmove="handleTouch($event)"
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
