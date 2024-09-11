<template>
  <div class="w-full">
    <h1 class="pb-5 text-3xl flex items-center gap-4">
      <strong class="text-blue-500 uppercase  text-2xl">{{ alertmessage }},</strong><span class="text-orange-400 font-extrabold"> {{ userName }}</span>
    </h1>
<MemberCard/>
<MembersTableBabeClass/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useMemberStore } from '~/stores/members'
import defaultImage from '../../assets/icons.png'


definePageMeta({
  layout: 'member',
  middleware:'auth'
})

const memberStore = useMemberStore()

const alertmessage = ref('')

const isClient = typeof window !== 'undefined'

const userName = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.userName : ''
  }
  return ''
})

const date = new Date()
const current = date.getHours()

if (current < 12) {
  alertmessage.value = "Good Morning"
  // Uncomment the following lines if speech synthesis is needed
  // const voice = new SpeechSynthesisUtterance('Good Morning')
  // window.speechSynthesis.speak(voice)
} else if (current >= 12 && current < 18) {
  alertmessage.value = "Good Afternoon"
  // Uncomment the following lines if speech synthesis is needed
  // const voice = new SpeechSynthesisUtterance('Good Afternoon ' + userName.value)
  // window.speechSynthesis.speak(voice)
} else {
  alertmessage.value = "Good Evening"
  // Uncomment the following lines if speech synthesis is needed
  // const voice = new SpeechSynthesisUtterance('Good Evening')
  // window.speechSynthesis.speak(voice)
}

// Fetch members when the component is mounted
onMounted(() => {
  if (isClient) {
    memberStore.fetchMembers()
  }
})
</script>

<style>

</style>