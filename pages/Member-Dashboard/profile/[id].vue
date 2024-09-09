<template>
  <div>
    <div>
      <h1 class="font-light pb-5 text-3xl text-primary"><span class="text-orange-400 font-semibold">{{ userInfo.userName }}</span> Profile Setting</h1>
    </div>
    <div class="flex items-center justify-center w-full">
      <div class="w-[50%]">
        <UCard>
          <div class="flex justify-center flex-col items-center">
            <div class="relative flex justify-center items-center">
              <img :src="userInfo.memberImage.url" 
                   alt="User Image" 
                   class="w-20 h-20 rounded-full object-cover bg-gray-200">
            </div>
            <h1 class="py-2 font-semibold text-orange-400 text-xl">{{ userInfo.userName }}</h1>
          </div>
          <div class="flex gap-4 mb-3 p-4 bg-gray-100 rounded-xl justify-between">
            <div class="text-xl font-semibold text-primary">Email Address:</div>
            <div class="text-xl font-light">{{ userInfo.email }}</div>
          </div>
          <div class="flex gap-4 mb-4 p-4 bg-gray-100 rounded-xl justify-between">
            <div class="text-xl font-semibold text-primary">Username:</div>
            <div class="text-xl font-light">{{ userInfo.userName }}</div>
          </div>
          <div class="flex mb-4 gap-4 bg-gray-100 rounded-xl p-4 justify-between">
            <div class="text-xl font-semibold text-primary">Role:</div>
            <div class="text-xl font-light">{{ userInfo.role }}</div>
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
import defaultImage from '~/assets/icons.png'


definePageMeta({
  layout: 'member'
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
