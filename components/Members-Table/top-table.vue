<script setup lang="ts">

const searchQuery = ref('')

const people = [{
  id: 1,
  FirstName: 'Angel',
  LastName: 'Kabagire',
  Sex: 'Female',
  Class: 'Top-Class',
  Report:'Angel.PDF',
  DateOfBirth: '15-9-2019'
}, {
  id: 2,
  FirstName: 'Henry',
  LastName: 'Ishimwe',
  Sex: 'Male',
  Class: 'Top-Class',
  Report:'Henry.PDF',
  DateOfBirth: '15-9-2020'
}, {
  id: 3,
  FirstName: 'Cook',
  LastName: 'Tom',
  Sex: 'Male',
  Class: 'Top-Class',
  Report:'Cook.PDF',
  DateOfBirth: '15-9-2022'
}, {
  id: 4,
  FirstName: 'Francise',
  LastName: 'Iradukunda',
  Sex: 'Famale',
  Class: 'Top-Class',
  Report:'Francise.PDF',
  DateOfBirth: '15-9-2019'
},
 {
  id: 5,
  FirstName: 'Leonard',
  LastName: 'Chriss',
  Sex: 'Male',
  Class: 'Top-Class',
  Report:'Leonard.PDF',
  DateOfBirth: '15-9-2018'
}, {
  id: 6,
  FirstName: 'Floyd',
  LastName: 'Miles',
  Sex: 'Female',
  Class: 'Top-Class',
  Report:'Floyd.PDF',
  DateOfBirth: '15-9-2022'
}];

const filteredStudent = computed(()=>{
  return people.filter(student =>{
    return (
      student.FirstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})
</script>

<template>
  <div class="p-5">
    <div class="flex justify-between items-center py-5">
      <UInput
    icon="i-heroicons-magnifying-glass-20-solid"
    size="sm"
    color="white"
    :trailing="false"
    v-model="searchQuery"
    placeholder="Search..."
  />
      <UButton to="/Member-Dashboard/StudentForm/top-class">ADD NEW</UButton>
    </div>
    <UCard>
      <UTable :rows="filteredStudent" />
    </UCard>
 
  </div>

</template>

