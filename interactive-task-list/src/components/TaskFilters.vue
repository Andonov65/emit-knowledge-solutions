<template>
  <div class="flex flex-wrap sm:justify-end gap-4">
    <label class="flex items-center flex-col sm:flex-row">
      Filter by:
      <select v-model="state.filterBy" class="mx-1 border-2 focus:outline-none px-2 py-1">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not Completed</option>
      </select>
    </label>

    <label class="flex items-center flex-col sm:flex-row">
      Sort by:
      <select v-model="state.sortBy" class="mx-1 border-2 focus:outline-none px-2 py-1">
        <option value="alphabetical">Alphabetical</option>
        <option value="priority">Priority</option>
        <option value="date">Date</option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/composable/useTasksStore'
import { storeToRefs } from 'pinia'

const pageStore = useTasksStore()
const { state } = storeToRefs(pageStore)
</script>

<style scoped></style>
