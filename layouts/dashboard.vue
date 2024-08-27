<template>
  <div class="flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div class="bg-[#1b1b29] md:w-64 w-full fixed md:h-screen h-screen shadow-xl flex flex-col justify-between">
      <div>
        <h1 class="p-4 text-white font-bold text-center md:text-left">HVO International</h1>
    <NuxtLink to="/Dashboard/admin" class="bg-green-400 text-white font-bold flex p-2 items-center gap-4"> <UIcon name="i-ic-baseline-dashboard"/>Dashboard</NuxtLink>

        <!-- Members Dropdown -->
        <div>
          <div @click="toggleDropdown" class="cursor-pointer py-2">
            <span class="font-semibold py-1 px-2 flex items-center justify-between w-full text-white hover:bg-gray-800">
              <span class="flex items-center gap-4"> <UIcon name="heroicons-user-group"/> Members</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" :class="{'rotate-180': dropdownOpen}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>

          <!-- Dropdown Links -->
          <ul v-if="dropdownOpen" class="flex flex-col text-gray-300">
            <NuxtLink to="/Dashboard/members/createMember" class="py-1 px-4 hover:text-primary">Create Members</NuxtLink>
            <NuxtLink to="/Dashboard/members/view-members" class="py-1 px-4 hover:text-primary">View Members</NuxtLink>
          </ul>
        </div>

        <!-- Students Dropdown -->
        <div>
          <div @click="toggleDrop" class="cursor-pointer py-2">
            <span class="font-semibold py-1 px-2 flex items-center justify-between w-full text-white hover:bg-gray-800">
              <span class="flex items-center gap-4"> <UIcon name="i-ic-baseline-people-alt"/> Students</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" :class="{'rotate-180': dropdownOpenx}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdownOpenx" class="flex flex-col text-gray-300">
            <NuxtLink to="/Dashboard/Students/babe-class" class="py-1 px-4 hover:text-primary">Babe Class</NuxtLink>
            <NuxtLink to="/Dashboard/Students/middle-class" class="py-1 px-4 hover:text-primary">Middle Class</NuxtLink>
            <NuxtLink to="/Dashboard/Students/top-class" class="py-1 px-4 hover:text-primary">Top Class</NuxtLink>
          </ul>
        </div>
        <NuxtLink to="/Dashboard/Profile" class="font-semibold text-white flex p-2 items-center gap-4 hover:bg-gray-800"> <UIcon name="i-ic-round-person-2"/>Profile</NuxtLink>
      </div>

      <!-- Logout Button -->
      <div class="p-4">
        <button @click="logout" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>

    <div class="w-full md:ml-64 relative ">
      <!-- Header -->
      <div class="w-full bg-white shadow-md sticky top-0 z-50 p-4 flex justify-between items-center">
        <h1 class="text-center md:text-left font-bold text-green-400 text-2xl">Dashboard</h1>
        <div class="flex items-center space-x-4">
          <img :src="items.image.url" alt="Profile Image" class="h-10 w-10 rounded-full" />
          <span class=" font-semibold text-green-400 hidden md:inline">{{ items.username }}</span>
        </div>
      </div>

      <div class="pt-4 px-4 mb-6">
        <slot />
      </div>
      <div class="w-full p-1 fixed bottom-0 mb-0 bg-white text-primary shadow-xl">
  <h1 class="text-center md:text-center font-semibold text-md">
   HVO &copy; {{ new Date().getFullYear() }} All rights reserved
  </h1>
</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dropdownOpen = ref(false)
const dropdownOpenx = ref(false)
const memberStore = useMemberStore()
const items = ref({ image: '', username: '' })

onMounted(async () => {
  await memberStore.fetchMembers()
  const member = memberStore.members[0] || {}
  items.value = {
    image: member.memberImage || '',
    username: member.userName || ''
  }
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleDrop = () => {
  dropdownOpenx.value = !dropdownOpenx.value
}

const logout = () => {
  console.log('Logout clicked')
}
</script>

<style scoped>

</style>
