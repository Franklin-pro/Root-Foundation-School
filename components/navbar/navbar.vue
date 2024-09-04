<template>
  <div class='sticky top-0 shadow-xl bg-transparent z-50 w-full px-4 py-3'>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-6">
      <div class="text-xl font-bold text-primary">
        ROOT-FOUND
      </div>
<div v-for="item in items" class="flex items-center gap-2 text-muted-color hover:text-primary">
  <UIcon :name="item.icon"/>
     <NuxtLink to="/">{{ item.label }}</NuxtLink> 
    </div>
    </div>
  
    <div class="flex items-center gap-4">
      <UButton to="/Login" color="gray" class="bg-transparent border-none">Sign-In</UButton>
      <UButton icon="i-heroicons-sun" color="gray" class="rounded-full p-3"/>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
  {
    label: "Home",
    icon: "i-heroicons-home",
  },
  {
    label: "About Us",
    icon: "i-heroicons-book-open",
  },
  {
    label: "Contact Us",
    icon: "i-heroicons-chat-bubble-left-ellipsis",
  },

  {
    label: "Blogs",
    icon: "i-heroicons-bookmark",
  },
]);
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.navbar {
  width: 100%;
  position: sticky;
  top: 0;
  transition: background-color 0.3s ease;
  padding: 1rem;
  background-color: transparent;
  z-index: 1000; /* Ensure the navbar stays on top */
}
.navbar.scrolled {
  background-color: black;
  color: white; 
}
</style>
