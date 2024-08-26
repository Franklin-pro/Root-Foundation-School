

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl text-primary px-5">Babe Class List</h1>

    </div>

    <MembersTableBabeClass />
 
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
  email: 'lindsay.walton@example.com'
}, {
  id: 2,
  username: 'Courtney Henry',
  Report:'henry PDF',
  course: 'Designer',
  email: 'courtney.henry@example.com'
}, {
  id: 3,
  username: 'Tom Cook',
  Report:'Tom PDF',
  course: 'Director of Product',
  email: 'tom.cook@example.com'
}, {
  id: 4,
  username: 'Whitney Francis',
  course: 'Copywriter',
  Report:'Whitney PDF',
  email: 'whitney.francis@example.com'
}, {
  id: 5,
  username: 'Leonard Krasner',
  Report:'Leonard PDF',
  course: 'Senior Designer',
  email: 'leonard.krasner@example.com'
}, {
  id: 6,
  username: 'Floyd Miles',
  Report:'Miles PDF',
  course: 'Principal Designer',
  email: 'floyd.miles@example.com'
}]

const filterStudent = computed (()=>{
  return people.filter(person =>{
    return(
      person.username.toLowerCase().includes(searchQuery.value.toLowerCase())||
    person.course.toLowerCase().includes(searchQuery.value.toLowerCase())||
    person.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    
  })
})
</script>

<style>

</style>