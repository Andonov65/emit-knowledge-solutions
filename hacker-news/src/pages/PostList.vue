<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Hacker News - Top Stories</h1>

    <div class="mb-4">
      <input
        type="text"
        class="p-2 border rounded w-full"
        placeholder="Search posts..."
        v-model="searchQuery"
        @input="searchPosts"
      />
      <ul v-if="searchResults.length" class="mt-2 bg-white border rounded">
        <li
          v-for="result in searchResults"
          :key="result.objectID"
          @click="selectSearchResult(result)"
          class="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {{ result.title }}
        </li>
      </ul>
      <p v-else-if="searchQuery && !isSearching">No results found.</p>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="post in visiblePosts"
        :key="post.id"
        class="p-4 border rounded shadow-lg"
      >
        <h2 class="font-bold text-lg">{{ post.title }}</h2>
        <p>Score: {{ post.score }} | Comments: {{ post.descendants }}</p>
        <div class="flex justify-end">
          <router-link
            :to="{ name: 'PostDetails', params: { id: post.id }}"
            class="text-white mt-2 px-2 py-1 rounded-md bg-indigo-800 hover:bg-indigo-600"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="loadingMore" class="text-center mt-4">
      Loading more posts...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import HNService from "@/services/HnService"
import { useRouter } from 'vue-router'

const searchQuery = ref("")
const searchResults = ref<any[]>([])
const isSearching = ref(false)

const posts = ref<any[]>([])
const visiblePosts = ref<any[]>([])
const loadingMore = ref(false)

const router = useRouter()

const fetchPosts = async () => {
  try {
    const topStoryIds = await HNService.fetchTopStories()
    const storyDetails = await Promise.all(
      topStoryIds.slice(0, 30).map((id) => HNService.fetchItemDetails(id))
    )
    posts.value = storyDetails.filter((story) => story.type === "story")
    visiblePosts.value = posts.value.slice(0, 10)
  } catch (error) {
    console.error("Error fetching posts:", error)
  }
}

const loadMorePosts = () => {
  if (loadingMore.value) return
  loadingMore.value = true
  setTimeout(() => {
    const currentLength = visiblePosts.value.length
    visiblePosts.value = posts.value.slice(0, currentLength + 10)
    loadingMore.value = false
  }, 1000)
}

const searchPosts = async () => {
  isSearching.value = true
  searchResults.value = await HNService.searchPosts(searchQuery.value)
  isSearching.value = false
}

const selectSearchResult = (result: any) => {
  searchQuery.value = ""
  searchResults.value = []
  router.push({ name: "PostDetails", params: { id: result.objectID } })
}

onMounted(fetchPosts)

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 50
  ) {
    loadMorePosts()
  }
})
</script>
