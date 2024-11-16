import { ref, computed, watch, reactive } from 'vue'
import Task, { type Priority } from '../models/Task'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks-store', () => {
  const form = ref({
    title: '',
    description: '',
    priority: '',
  })

  const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))

  const filterBy = ref('all')
  const sortBy = ref('date')

  watch(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    console.log(tasks.value, tasks.value, filteredAndSortedTasks.value)
  })

  const errorMessage = ref('')

  const addTask = () => {
    if (form.value.title !== '' && form.value.description !== '' && form.value.priority) {
      errorMessage.value = ''
      const task = new Task(
        Date.now(),
        form.value.title,
        form.value.description,
        form.value.priority as Priority,
      )
      tasks.value = [...tasks.value, task]
      form.value = { title: '', description: '', priority: '' }
    } else {
      errorMessage.value = 'Please fill out all fields'
    }
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
      tasks.value = [...tasks.value]
    }
  }

  const filteredAndSortedTasks = computed(() => {
    console.log('Filtered and sorted tasks computed')
    let filteredTasks = [...tasks.value]

    if (filterBy.value === 'completed') {
      filteredTasks = filteredTasks.filter((task) => task.completed)
    } else if (filterBy.value === 'notCompleted') {
      filteredTasks = filteredTasks.filter((task) => !task.completed)
    }

    if (sortBy.value === 'alphabetical') {
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy.value === 'priority') {
      const priorityOrder: Record<Priority, number> = { High: 1, Medium: 2, Low: 3 }
      filteredTasks.sort(
        (a: Task, b: Task) => priorityOrder[a.priority] - priorityOrder[b.priority],
      )
    } else if (sortBy.value === 'date') {
      filteredTasks.sort((a: Task, b: Task) => b.createdDate - a.createdDate)
    }

    return filteredTasks
  })

  const state = ref({
    form,
    tasks,
    filterBy,
    sortBy,
    filteredAndSortedTasks,
    errorMessage,
  })

  const actions = reactive({
    addTask,
    deleteTask,
    toggleTaskCompletion,
  })

  return { state, actions }
})
