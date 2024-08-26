<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the search query as a reactive variable
const searchQuery = ref('')

// Sample data for people
const people = [
  { id: 1, FirstName: 'Angel', LastName: 'Kabagire', Sex: 'Female', Class: 'Babe-Class', Report: 'report1.pdf', DateOfBirth: '15-9-2019' },
  { id: 2, FirstName: 'Henry', LastName: 'Ishimwe', Sex: 'Male', Class: 'Babe-Class', Report: 'report2.pdf', DateOfBirth: '15-9-2020' },
  { id: 3, FirstName: 'Tom', LastName: 'Cook', Sex: 'Male', Class: 'Babe-Class', Report: 'report3.pdf', DateOfBirth: '15-9-2022' },
  { id: 4, FirstName: 'Francise', LastName: 'Iradukunda', Sex: 'Female', Class: 'Babe-Class', Report: 'report4.pdf', DateOfBirth: '15-9-2019' },
  { id: 5, FirstName: 'Leonard', LastName: 'Chriss', Sex: 'Male', Class: 'Babe-Class', Report: 'report5.pdf', DateOfBirth: '15-9-2018' },
  { id: 6, FirstName: 'Floyd', LastName: 'Miles', Sex: 'Female', Class: 'Babe-Class', Report: 'report6.pdf', DateOfBirth: '15-9-2022' }
]

// Filter students based on search query
const filteredStudent = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return people.filter(student => 
    student.FirstName.toLowerCase().includes(query) ||
    student.LastName.toLowerCase().includes(query)
  )
})

// Define columns for the table
const columns = [
  { key: 'FirstName', label: 'First Name' },
  { key: 'LastName', label: 'Last Name' },
  { key: 'Sex', label: 'Sex' },
  { key: 'Class', label: 'Class' },
  { key: 'DateOfBirth', label: 'Date of Birth' },
  { 
    key: 'Report', 
    label: 'Report',
    render: (row: any) => {
      const reportUrl = `/pdf/${row.Report}`
      return `<a href="${reportUrl}" target="_blank" class="text-blue-500 underline">Open PDF</a>`
    }
  }
]
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
      <UButton :to="`/Member-Dashboard/StudentForm/babe-class`">ADD NEW</UButton>
    </div>
    <UCard>
      <UTable :rows="filteredStudent" :columns="columns" />
    </UCard>
  </div>
</template>
