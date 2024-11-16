<template>
  <form
    @submit.prevent="actions.addTask()"
    class="py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center items-center"
  >
    <div>
      <label class="font-semibold">Name</label>
      <input
        v-model="state.form.title"
        placeholder="Task Title"
        required
        class="border-2 w-full border-slate-200 px-2 py-1 focus:outline-none focus:border-green-300"
      />
    </div>
    <div>
      <label class="font-semibold">Priority</label>
      <select
        v-model="state.form.priority"
        class="border-2 border-slate-200 px-2 py-1 w-full focus:outline-none focus:border-green-300"
      >
        <option disabled value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <div class="sm:col-span-2">
      <label class="font-semibold">Description</label>
      <textarea
        v-model="state.form.description"
        placeholder="Task Description"
        required
        class="border-2 w-full border-slate-200 px-2 py-1 focus:outline-none focus:border-green-300"
      />
    </div>
    <div class="sm:col-span-2 flex flex-col justify-end">
      <button type="submit" class="bg-green-700 px-3 py-1 rounded-md text-white hover:bg-green-500">
        Add Task
      </button>
      <div v-if="state.errorMessage" class="text-red-500 text-sm font-bold text-center">
        {{ state.errorMessage }}
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/composable/useTasksStore'
import {storeToRefs} from "pinia";

const pageStore = useTasksStore()
const { state } = storeToRefs(pageStore)
const {actions} = pageStore
</script>

<style scoped></style>
