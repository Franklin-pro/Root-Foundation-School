<script setup lang="ts">
const people = [{
  id: 1,
  FirstName: 'Angel',
  LastName: 'Kabagire',
  Sex: 'Female',
  Class: 'Middle-Class',
  DateOfBirth: '15-9-2019'
}, {
  id: 2,
  FirstName: 'Henry',
  LastName: 'Ishimwe',
  Sex: 'Male',
  Class: 'Top-Class',
  DateOfBirth: '15-9-2020'
}, {
  id: 3,
  FirstName: 'Cook',
  LastName: 'Tom',
  Sex: 'Male',
  Class: 'Babe-Class',
  DateOfBirth: '15-9-2022'
}, {
  id: 4,
  FirstName: 'Francise',
  LastName: 'Iradukunda',
  Sex: 'Famale',
  Class: 'Top-Class',
  DateOfBirth: '15-9-2019'
},
 {
  id: 5,
  FirstName: 'Leonard',
  LastName: 'Chriss',
  Sex: 'Male',
  Class: 'Middle-Class',
  DateOfBirth: '15-9-2018'
}, {
  id: 6,
  FirstName: 'Floyd',
  LastName: 'Miles',
  Sex: 'Female',
  Class: 'Babe-Class',
  DateOfBirth: '15-9-2022'
}]
</script>

<template>
  <div class="py-5">
    <h1 class="font-bold text-primary text-2xl py-2">ALL-STUDENTS</h1>
    <UCard>
      <UTable :rows="people" />
    </UCard>
 
  </div>

</template>

