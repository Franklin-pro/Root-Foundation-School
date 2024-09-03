<template>
  <div>
    <h1 class="font-bold py-5 text-3xl text-primary">PROFILE</h1>
    <div class="flex items-center justify-center w-full">
      <div class="w-[50%]">
        <UCard>
          <div class="flex justify-center flex-col items-center">
            <div class="relative flex justify-center items-center">
              <img :src="userInfo.memberImage.url" 
                   alt="User Image" 
                   class="w-20 h-20 rounded-full object-cover bg-gray-200">
            </div>
            <h1 class="py-2 font-semibold text-primary text-xl">{{ userInfo.userName }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Email Address:</strong>
            <h1>{{ userInfo.email }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Username:</strong>
            <h1>{{ userInfo.userName }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Role:</strong>
            <h1>{{ userInfo.role }}</h1>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMemberStore } from '~/stores/members'
import defaultImage from '~/assets/icons.png'  // Path to default image


definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const memberStore = useMemberStore()

const memberId = ref<string>('')

interface MemberImage {
  url: string
}

interface UserInfo {
  email: string
  userName: string
  role: string
  memberImage: MemberImage
}

const userInfo = computed<UserInfo>(() => {
  const member = memberStore.members.find(member => member._id === memberId.value)
  return member ? {
    email: member.email,
    userName: member.userName,
    role: member.role,
    memberImage: { url: member.memberImage ? member.memberImage : defaultImage }
  } : {
    email: '',
    userName: '',
    role: '',
    memberImage: { url: defaultImage }
  }
})


onMounted(() => {
  if (process.client) {
    const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("user") || '{}')
    memberId.value = userInfoFromLocalStorage._id || ''
    
    memberStore.fetchMember(memberId.value)
      .catch(error => {
        console.error('Failed to fetch member', error)
      })
  }
})
</script>



<style scoped>

</style>
