<template>
  <div class="p-5">
    <div class="flex items-center justify-between py-5">
      <h1 class="font-bold text-2xl text-primary">Members List</h1>
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
        v-model="searchQuery"
      />
      <UButton to="/Dashboard/members/createMember">Create New</UButton>
    </div>
    <UCard>
      <UTable :rows="filteredPeople" />
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: 'dashboard'
});

const searchQuery = ref('');

const people = [
  {
    id: 1,
    username: 'Lindsay Walton',
    course: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    id: 2,
    username: 'Courtney Henry',
    course: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  },
  {
    id: 3,
    username: 'Tom Cook',
    course: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
  },
  {
    id: 4,
    username: 'Whitney Francis',
    course: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
  },
  {
    id: 5,
    username: 'Leonard Krasner',
    course: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Admin'
  },
  {
    id: 6,
    username: 'Floyd Miles',
    course: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
  }
];

const filteredPeople = computed(() => {
  return people.filter(person => {
    return (
      person.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.course.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>

<style>
/* Add any necessary styling here */
</style>
