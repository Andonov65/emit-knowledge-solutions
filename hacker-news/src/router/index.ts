import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/pages/PostList.vue'
import PostDetails from '@/pages/PostDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: PostList, name: 'PostList' },
    { path: '/post/:id', component: PostDetails, name: 'PostDetails' },
  ],
})

export default router
