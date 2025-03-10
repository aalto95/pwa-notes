<script setup lang="ts">
import { useStore } from '@/store/store';
const store = useStore();
</script>

<template>
  <div
    class="fixed z-20 flex h-15 w-full transform items-center justify-center transition-all duration-500 ease-in-out"
    :class="{
      'translate-y-0': store.notification.visible,
      '-translate-y-full': !store.notification.visible,
      'bg-blue-500': store.notification.type === 0,
      'bg-green-500': store.notification.type === 1,
      'bg-red-500': store.notification.type === 2,
    }"
  >
    <h1 class="text-2xl font-bold text-white">
      Note
      {{
        store.notification.type === 0
          ? 'Created'
          : store.notification.type === 1
            ? 'Edited'
            : 'Deleted'
      }}
    </h1>
  </div>
</template>

<style scoped></style>
