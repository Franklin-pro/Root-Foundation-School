<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
    <div v-for="item in items" :key="item.id" class=" w-full">
  <UCard class="w-full">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
      <h1 class="font-semibold text-xl text-green-500">{{ item.text }}</h1>
      <h2 class="font-bold text-2xl">{{ item.number }}</h2> 
    </div>
    <div>
      <NuxtLink :to="item.path"><UIcon name="i-heroicons-eye-20-solid" class="hover:text-primary"/></NuxtLink>
    </div>
    </div>
 
  </UCard>

</div>
  </div>
</template>

<script setup>
const items = {
  babe:{
    text:"Babe-Class",
    number: "23",
    path:"/Member-Dashboard/View-Students/babe-class"
  },
  middle:{
     text:"Middle-Class",
    number: "30",
    path:"/Member-Dashboard/View-Students/middle-class"
  },
  top:{
    text:"Top-Class",
    number: "40",
    path:"/Member-Dashboard/View-Students/top-class"
  }
}
</script>