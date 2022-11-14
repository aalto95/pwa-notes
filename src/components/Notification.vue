<template>
  <div
    class="fixed h-15 z-20 w-full flex justify-center items-center transition-all duration-500 ease-in-out transform"
    :class="{
      'translate-y-0': store.notification.visible,
      '-translate-y-full': !store.notification.visible,
      'bg-blue-500': store.notification.type === 0,
      'bg-green-500': store.notification.type === 1,
      'bg-red-500': store.notification.type === 2,
    }"
  >
    <h1 class="font-bold text-2xl text-white">
      Note
      {{
        store.notification.type === 0
          ? "Created"
          : store.notification.type === 1
          ? "Edited"
          : "Deleted"
      }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/store";
const store = useStore();
</script>

<style scoped></style>
