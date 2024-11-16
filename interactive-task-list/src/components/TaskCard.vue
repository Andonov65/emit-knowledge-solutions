<template>
  <div class="flex flex-col md:flex-row justify-between card p-4 rounded-md shadow-sm m-3 bg-gray-200">
    <div :class="{ 'line-through': task.completed }">
      <h3 class="font-bold text-lg">{{ task.title }} ({{ task.priority }})</h3>
      <p class="text-gray-500">{{ task.description }}</p>
      <small
        >Created: {{ new Date(task.createdDate).toLocaleDateString() }}
        {{ new Date(task.createdDate).toLocaleTimeString() }}</small
      >
    </div>
    <div class="flex flex-col items-end gap-3">
     <div>
       <button
         @click="actions.deleteTask(task.id)"
         class="bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-400"
       >
         Delete
       </button>
     </div>
      <div>
        <button
          @click="actions.toggleTaskCompletion(task.id)"
          class="bg-indigo-500 text-white rounded-md px-3 py-1 hover:bg-indigo-400"
        >
          {{ task.completed ? 'Mark Incomplete' : 'Mark Complete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/composable/useTasksStore'
import Task from '@/models/Task'
import type { PropType } from 'vue'

defineProps({
  task: {
    required: true,
    type: Object as PropType<Task>,
  },
})
const pageStore = useTasksStore()
const { actions } = pageStore
</script>

<style scoped></style>
