<template>
  <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
    <div v-for="item in items" :key="item.id" class=" w-full">
  <UCard class="w-full flex flex-col">
    <div class="flex justify-between items-center">
      <div>
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
  teacher:{
    text:"Members",
    number: "23",
    path: "/Dashboard/members/view-members"
  },

  babeclass:{
     text:"Babe-Class",
    number: "23",
     path: "/Dashboard/Students/babe-class"
  },
  middleclass:{
     text:"Middle-Class",
    number: "23",
     path: "/Dashboard/Students/middle-class"
  },
  topclass:{
     text:"Top-Class",
    number: "23",
     path: "/Dashboard/Students/top-class"
  }
}
</script>