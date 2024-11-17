<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row justify-between items-center mb-2">
      <h1 class="text-xl font-bold mb-4">{{ post?.title }}</h1>
      <div v-if="post?.url">
        <a
          :href="post.url"
          target="_blank"
          class="bg-blue-700 text-sm text-white rounded-md px-2 py-1 hover:bg-blue-500 whitespace-nowrap"
        >
          Visit Original Link
        </a>
      </div>
    </div>
    <p v-if="post?.text" class="p-3 break-words shadow-lg border rounded-md">{{ post.text }}</p>

    <h2 class="text-lg font-bold mt-4">Comments</h2>
    <ul>
      <li
        v-for="(comment, index) in comments"
        :key="comment.id"
        class="p-2 border-b-2 border-gray-300"
      >
        <p
          v-html="comment.text"
          class="p-2 break-words"
          :class="{ 'bg-indigo-100 rounded-md': index % 2 === 0 }"
        ></p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HNService from '@/services/HnService'

const route = useRoute()
const post = ref<any>(null)
const comments = ref<any[]>([])

const fetchPostDetails = async () => {
  const postId = Number(route.params.id)
  post.value = await HNService.fetchItemDetails(postId)

  if (post.value.kids) {
    const commentDetails = await Promise.all(
      post.value.kids.map((id: number) => HNService.fetchItemDetails(id)),
    )
    comments.value = commentDetails
  }
}

onMounted(fetchPostDetails)
</script>

<style scoped>
::v-deep(pre) {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

::v-deep(code) {
  font-family: 'Courier New', Courier, monospace;
  color: #4b5563;
}
</style>
