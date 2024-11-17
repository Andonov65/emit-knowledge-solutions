<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="my-4">
    <header>
      <nav class="flex justify-center bg-zinc-700 py-3">
        <RouterLink
          class="bg-white text-zinc-700 font-bold rounded-md px-2 py-1 hover:bg-zinc-300"
          to="/"
          >Posts</RouterLink
        >
      </nav>
    </header>

    <main class="md:container mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
