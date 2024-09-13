<template>
  <div class="carousel-container relative overflow-hidden rounded-lg">
    <div
      class="carousel-wrapper flex transition-transform duration-500"
      :style="{ transform: `translateX(-${activeIndex * 100 / itemsPerPage}%)` }"
    >
      <div
        v-for="(item, index) in paginatedItems"
        :key="item.id"
        class="carousel-item w-full lg:w-1/3 flex-shrink-0 p-4"
      >
        <img :src="item.blogImage?.url" class="w-full h-60 object-cover rounded-lg" draggable="false" />
        <div class="carousel-content p-4 bg-white">
          <span class="carousel-status text-gray-500 text-xs uppercase">{{ item.blogStatus }}</span>
          <h3 class=" text-lg text-black font-bold mt-2">{{ item.blogName}}</h3>
          <p class="carousel-description text-sm truncate text-gray-600">{{ item.blogDescription}}</p>
        </div>
      </div>
    </div>
    <!-- Previous and Next buttons -->
    <UButton @click="prevSlide" icon="i-heroicons-chevron-left" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2 text-white bg-black/30 hover:bg-black/50"/>
    <UButton @click="nextSlide"  icon="i-heroicons-chevron-right"  class="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2 text-white bg-black/30 hover:bg-black/50"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const blogStore = useBlogStore()
const filteredBlogs = computed(() => {
  if (!blogStore.blogs) return [];
  return blogStore.blogs
    .filter(blogs => {
      return (
        blogs.blogName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blogs.blogStatus.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })
    .reverse()
});

onMounted(async () => {
  await blogStore.fetchBlogs();
});
const itemsPerPage = 3;
const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage));

const activeIndex = ref(0);

const paginatedItems = computed(() => filteredBlogs.value.slice(activeIndex.value * itemsPerPage, (activeIndex.value + 1) * itemsPerPage));

const nextSlide = () => {
  if (activeIndex.value < totalPages.value - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0;
  }
};

const prevSlide = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  } else {
    activeIndex.value = totalPages.value - 1;
  }
};
</script>

<style scoped>
.carousel-container {
  max-width: 1200px;
  margin: auto;
  position: relative;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
}

.carousel-item {
  flex-shrink: 0;
}

.carousel-content {
  background-color: white;
  padding: 16px;
}

button {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  position: absolute;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
