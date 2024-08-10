<template>
  <div class="flex gap-4">
    <div v-for="item in items" :key="item.id" class=" w-full">
  <UCard class="w-full flex flex-col">
    <h1 class="font-semibold text-xl text-green-500">{{ item.text }}</h1>
   <h2 class="font-bold text-2xl">{{ item.number }}</h2> 
  </UCard>

</div>
  </div>


</template>

<script setup>
const items = {
  teacher:{
    text:"Members",
    number: "23"
  },
  student:{
     text:"Students",
    number: "23"
  }
}
</script>