<template>

  <div class="flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div class="sidebar md:w-64 w-full fixed md:h-screen h-screen shadow-xl px-3 py-2 flex flex-col justify-between"
      :class="colorMode === 'dark' ? 'bg-gray-600' : 'bg-gray-50'">
      <div>
        <h1 class="p-4 text-blue-600 font-extrabold text-3xl text-center md:text-center">ROOT FOUND</h1>

          <NuxtLink to="/Member-Dashboard/member" class="bg-blue-400 rounded-lg text-white font-bold flex p-2 items-center gap-4">
          <UIcon name="i-ic-baseline-dashboard" />Dashboard
        </NuxtLink>

        <div>
          <div @click="toggleDropdown" class="cursor-pointer duration-500 py-2">
            <span class="font-semibold py-1 px-2 flex rounded-lg duration-500 items-center justify-between w-full hover:bg-gray-500">
              <span class="flex items-center gap-4">
                <UIcon name="heroicons-user-group" /> Create Students
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform"
                :class="{ 'rotate-180': dropdownOpen }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>

          <!-- Dropdown Links -->
          <ul v-if="dropdownOpen" class="flex flex-col">
            <NuxtLink to="/Member-Dashboard/StudentForm/students"
              class="py-1 px-4 flex items-center gap-3 hover:text-blue-400">
              <UIcon name="i-heroicons-plus-circle" /> new Student
            </NuxtLink>
          </ul>
        </div>

        <!-- Students Dropdown -->
        <div>
          <div @click="toggleDrop" class="cursor-pointer duration-300 py-2">
            <span class="font-semibold py-1 px-2 flex rounded-lg duration-500 items-center justify-between w-full hover:bg-gray-500">
              <span class="flex items-center gap-4">
                <UIcon name="i-ic-baseline-people-alt" />View Students
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform"
                :class="{ 'rotate-180': dropdownOpenx }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdownOpenx" class="flex flex-col">
            <NuxtLink to="/Member-Dashboard/View-Students/students"
              class="py-1 px-4 flex justify-between items-center hover:text-blue-400"><span>
                <UIcon name="i-heroicons-document" /> Student List
              </span>
              <span class="bg-orange-500 px-1.5 rounded-full text-sm">{{ studentStore.students.length }}</span>
            </NuxtLink>
          </ul>
        </div>
        <NuxtLink :to="`/member-dashboard/chats/`" class="font-semibold rounded-lg duration-500 flex p-2 items-center gap-4 hover:bg-gray-500">
          <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" /> Chats
        </NuxtLink>
        <NuxtLink :to="`/member-dashboard/Profile/${memberId}`"
          class="font-semibold flex p-2 items-center rounded-lg duration-500 gap-4 hover:bg-gray-500">
          <UIcon name="i-ic-round-person-2" /> Profile
        </NuxtLink>
      </div>

      <div class="p-4 flex flex-col gap-4">
        <button @click="logout" class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          Logout
        </button>
      </div>
    </div>


    <div class="w-full md:ml-64 relative">
      <!-- <UCard class="rounded-none"> -->
      <div class="
    'w-full sticky top-0 z-50 flex shadow-sm p-3 justify-between items-center'
  " :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-50 text-black'">
        <h1 class="text-center md:text-left font-extrabold text-blue-500 text-xl">Member</h1>
        <div class="flex items-center gap-4">
          <NuxtLink :to="`/member-dashboard/Profile/${memberId}`" class=" relative flex items-center gap-4">
            <UChip position="bottom-right" class="absolute z-50 top-2 right-1">
            </UChip>
            <UTooltip text="profile setting">
              <img :src="memberImage || defaultImage" alt="Profile Image"
                class="h-10 w-10 border border-gray-500 object-contain rounded-full" />
            </UTooltip>

          </NuxtLink>
          <UTooltip text="change theme">

            <button @click="toggleTheme"
              class="p-3 flex items-center border border-gray-200 dark:bg-gray-800 rounded-full">
              <UIcon :name="colorMode === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="text-xl " />
            </button>
          </UTooltip>

        </div>
      </div>
      <!-- </UCard> -->


      <div class="pt-4 mb-6 min-h-screen px-4">
        <slot />
      </div>

      <div class="w-full p-3 sticky bottom-0 mb-0  shadow-xl"
        :class="colorMode === 'dark' ? 'bg-gray-600' : 'bg-gray-50'">
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
const studentStore = useStudentStore()
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
