<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <div class="body-class">
   <header>

     <div>
       Yeyy

       <nav>
         <RouterLink to="/">Home</RouterLink>
         <RouterLink to="/about">About</RouterLink>
       </nav>
     </div>
   </header>

   <RouterView />
 </div>
</template>

<style scoped>
.body-class {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
