

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl text-primary px-5">Middle Class List</h1>
  
    </div>

    <MembersTableMiddleClass/>
  
  </div>

</template>



<script lang="ts" setup>
definePageMeta({
  layout:'dashboard'
})

const searchQuery = ref('')

const people = [{
  id: 1,
  username: 'Lindsay Walton',
  Report:'linda PDF',
  course: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  username: 'Courtney Henry',
  Report:'henry PDF',
  course: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  username: 'Tom Cook',
  Report:'Tom PDF',
  course: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  username: 'Whitney Francis',
  course: 'Copywriter',
  Report:'Whitney PDF',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  username: 'Leonard Krasner',
  Report:'Leonard PDF',
  course: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Admin'
}, {
  id: 6,
  username: 'Floyd Miles',
  Report:'Miles PDF',
  course: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const filteredpeople = computed(()=>{
return people.filter(student =>{
  return(
    student.username.toLowerCase().includes(searchQuery.value.toLowerCase())||
    student.role.toLowerCase().includes(searchQuery.value.toLowerCase())
   
  )
})

})

</script>

<style>

</style>