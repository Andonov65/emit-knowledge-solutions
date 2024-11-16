<template>
  <div class="container mx-auto p-5 flex flex-col justify-center">
    <TaskForm />

    <TaskFilters />

    <ul>
      <li
        v-for="task in state.filteredAndSortedTasks"
        :key="task.id"
      >
        <TaskCard :task="task" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import { useTasksStore } from '@/composable/useTasksStore'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskCard from '@/components/TaskCard.vue'
import {storeToRefs} from "pinia";

const pageStore = useTasksStore()
const {state} = storeToRefs(pageStore)
</script>

<style scoped></style>
