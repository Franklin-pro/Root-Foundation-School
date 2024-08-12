

<template>
  <div class="p-5">
    <div class="flex items-center justify-between py-5">
      <h1 class="font-bold text-2xl text-primary">Top Class List</h1>
      <UButton>Add New</UButton>
    </div>
    <UCard>
    <UTable :rows="people" />
    </UCard>
  </div>

</template>



<script lang="ts" setup>
definePageMeta({
  layout:'dashboard'
})
const people = [{
  id: 1,
  username: 'Lindsay Walton',
  course: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  username: 'Courtney Henry',
  course: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  username: 'Tom Cook',
  course: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  username: 'Whitney Francis',
  course: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  username: 'Leonard Krasner',
  course: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Admin'
}, {
  id: 6,
  username: 'Floyd Miles',
  course: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]
</script>

<style>

</style>