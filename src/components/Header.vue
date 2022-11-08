<template>
  <header class="w-full h-15 text-white flex fixed z-10">
    <h1
      class="text-xl bg-black w-full h-full flex justify-center items-center text-center"
    >
      Notes App (With Drag And Drop)
    </h1>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "../store/store";

const store = useStore();
</script>

<style scoped></style>
