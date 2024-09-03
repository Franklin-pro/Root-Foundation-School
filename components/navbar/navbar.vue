<template>
  <div class='sticky top-0 shadow-xl bg-transparent z-50 w-full px-4 py-3'>
  <div class="flex justify-around items-center">
    <div class="text-2xl text-primary">
ROOT-FOUND
    </div>
    <div class="flex gap-4 text-xl text-gray-600">
<NuxtLink to="/" class="hover:text-primary" :active-class="'text-primary'">Home</NuxtLink>
<NuxtLink to="/" class="hover:text-primary">About Us</NuxtLink>
<NuxtLink to="/" class="hover:text-primary">Contact Us</NuxtLink>
    </div>
    <div class="flex items-center gap-4">
      <UButton to="/Login" color="gray" class="bg-transparent border-none">Sign-In</UButton>
      <UButton icon="i-heroicons-sun" color="gray" class="rounded-full p-3"/>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
