<template>
  <div class="flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'" class="sidebar md:w-64 w-full fixed md:h-screen h-screen shadow-xl flex flex-col justify-between">
      <div>
        <h1 class="p-4 text-primary font-bold text-center md:text-left"> ROOT FOUND</h1>

        <!-- Dashboard Link -->
        <NuxtLink to="/Dashboard/admin" class="bg-green-400 text-white font-bold flex p-2 items-center gap-4">
          <UIcon name="i-ic-baseline-dashboard"/> Dashboard
        </NuxtLink>

        <!-- Members Dropdown -->
        <div>
          <div @click="toggleDropdown" class="cursor-pointer py-2">
            <span class="font-semibold py-1 px-2 flex items-center justify-between w-full hover:bg-gray-200">
              <span class="flex items-center gap-4">
                <UIcon name="heroicons-user-group"/> Members
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" :class="{'rotate-180': dropdownOpen}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>

          <!-- Dropdown Links -->
          <ul v-if="dropdownOpen" class="flex flex-col">
            <NuxtLink to="/Dashboard/members/createMember" class="py-1 px-4 hover:text-primary">Create Members</NuxtLink>
            <NuxtLink to="/Dashboard/members/view-members" class="py-1 px-4 hover:text-primary">View Members</NuxtLink>
          </ul>
        </div>

        <!-- Students Dropdown -->
        <div>
          <div @click="toggleDrop" class="cursor-pointer py-2">
            <span class="font-semibold py-1 px-2 flex items-center justify-between w-full hover:bg-gray-200">
              <span class="flex items-center gap-4">
                <UIcon name="i-ic-baseline-people-alt"/> Students
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" :class="{'rotate-180': dropdownOpenx}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdownOpenx" class="flex flex-col">
            <NuxtLink to="/Dashboard/Students/students" class="py-1 px-4 hover:text-primary">Student List</NuxtLink>
          </ul>
        </div>

        <!-- Profile Link -->
        <NuxtLink
          :to="`/Dashboard/Profile/${memberId}`"
          class="font-semibold flex p-2 items-center gap-4 hover:bg-gray-200"
        >
          <UIcon name="i-ic-round-person-2"/> Profile
        </NuxtLink>
      </div>

      <div class="p-4 flex flex-col gap-4">
        <button @click="toggleTheme" class="p-2 bg-gray-200 dark:bg-gray-800 rounded">
           Change Theme
        </button>
        <button @click="logout" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="w-full md:ml-64 relative">
        <div :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'" class="w-full sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
          <h1 class="text-center md:text-left font-bold text-green-400 text-2xl">Dashboard</h1>
          <div>
            <div class="flex items-center gap-4">
              <img :src="memberImage || defaultImage" alt="Profile Image" class="h-10 w-10 rounded-full" />
              <span class="font-semibold text-green-400 hidden md:inline">{{ userName }}</span>
            </div>
          </div>
        </div>

      <div class="pt-4 px-4 min-h-screen mb-6">
        <slot />
      </div>

      <div :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'" class="w-full bg-gray-100 p-3 sticky bottom-0 mb-0 text-primary shadow-xl">
        <h1 class="text-center md:text-center font-semibold text-md">
         &copy; {{ new Date().getFullYear() }} All rights reserved
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useMemberStore } from '@/stores/members'
import type { Member } from '~/type'
import defaultImage from '../assets/icons.png'

const dropdownOpen = ref(false)
const dropdownOpenx = ref(false)

const memberStore = useMemberStore()
const memberId = ref<string>('')

const isClient = typeof window !== 'undefined'

const userName = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.userName : ''
  }
  return ''
})


const memberImage = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.memberImage?.url : ''
  }
  return ''
})


const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleDrop = () => {
  dropdownOpenx.value = !dropdownOpenx.value
}


const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}


const logout = () => {
  memberStore.logout()
}

onMounted(() => {
  if (isClient) {
    const userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    console.log('User Info:', userInfo) 
    memberId.value = userInfo._id || ''
    
    memberStore.fetchMember(memberId.value)
      .then(() => {
      })
      .catch(error => {
        console.error('Failed to fetch members', error)
      })
  }
})
</script>

<style scoped>

</style>
