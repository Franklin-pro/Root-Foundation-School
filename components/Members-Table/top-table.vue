<script setup lang="ts">

const searchQuery = ref('')
const people = [{
  id: 1,
  FirstName: 'Angel',
  LastName: 'Kabagire',
  Sex: 'Female',
  Class: 'Top-Class',
  Age: '15-9-2019'
}, {
  id: 2,
  FirstName: 'Henry',
  LastName: 'Ishimwe',
  Sex: 'Male',
  Class: 'Top-Class',
  Age: '15-9-2020'
}, {
  id: 3,
  FirstName: 'Cook',
  LastName: 'Tom',
  Sex: 'Male',
  Class: 'Top-Class',
  Age: '15-9-2022'
}, {
  id: 4,
  FirstName: 'Francise',
  LastName: 'Iradukunda',
  Sex: 'Famale',
  Class: 'Top-Class',
  Age: '15-9-2019'
},
 {
  id: 5,
  FirstName: 'Leonard',
  LastName: 'Chriss',
  Sex: 'Male',
  Class: 'Top-Class',
  Age: '15-9-2018'
}, {
  id: 6,
  FirstName: 'Floyd',
  LastName: 'Miles',
  Sex: 'Female',
  Class: 'Top-Class',
  Age: '15-9-2022'
}];

const filteredStudent = computed(()=>{
  return people.filter(person =>{
    return (
      person.FirstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.LastName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})



</script>

<template>
  <div class="p-5">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-primary text-2xl py-2">Top-Class</h1>
      <UInput
    icon="i-heroicons-magnifying-glass-20-solid"
    size="sm"
    color="white"
    :trailing="false"
    v-model="searchQuery"
    placeholder="Search students..."
  />
      <UButton to="/Member-Dashboard/StudentForm/top-class">ADD NEW</UButton>
    </div>
    <UCard>
      <UTable :rows="filteredStudent" />
    </UCard>
 
  </div>

</template>

