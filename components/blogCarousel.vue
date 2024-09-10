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
        <img :src="item.image" class="w-full h-60 object-cover rounded-lg" draggable="false" />
        <div class="carousel-content p-4 bg-white">
          <span class="carousel-status text-gray-500 text-xs uppercase">{{ item.status }}</span>
          <span class="carousel-date block text-gray-400 text-xs">{{ item.date }}</span>
          <h3 class="carousel-heading text-lg font-bold mt-2">{{ item.heading }}</h3>
          <p class="carousel-description text-sm text-gray-600">{{ item.description }}</p>
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

const items = ref([
  {
    id: 1,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-3.jpg",
    status: "LIFESTYLE",
    date: '21-march-2023',
    heading: "How to build coffee inside your home in 5 minutes",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
  },
  {
    id: 2,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg",
    status: "MARKETING",
    date: '21-march-2020',
    heading: "7 Tips to run your remote team faster and better.",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
  },
  {
    id: 3,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg",
    status: "PRODUCTIVITY",
    date: 'April 04, 2020',
    heading: "5 Productivity tips to write faster in the morning.",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
  },
  {
    id: 4,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-3.jpg",
    status: "LIFESTYLE",
    date: '22-April-2023',
    heading: "How to stay productive at home.",
    description: "Tips for maintaining productivity while working from home."
  },
  {
    id: 5,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg",
    status: "MARKETING",
    date: '30-march-2020',
    heading: "Strategies to enhance your marketing efforts.",
    description: "Effective marketing tips for growing your business."
  },
  {
    id: 6,
    image: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg",
    status: "PRODUCTIVITY",
    date: 'April 10, 2020',
    heading: "Morning routines for peak productivity.",
    description: "Create a morning routine that boosts productivity."
  }
]);

const itemsPerPage = 3;
const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

const activeIndex = ref(0);

const paginatedItems = computed(() => items.value.slice(activeIndex.value * itemsPerPage, (activeIndex.value + 1) * itemsPerPage));

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
