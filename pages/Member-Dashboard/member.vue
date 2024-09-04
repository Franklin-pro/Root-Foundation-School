<template>
  <div class="w-full">
  <h1 class="pb-5 text-4xl"><strong class="text-gray-300 text-3xl">{{ alertmessage }}</strong> {{ items.username }}</h1>
<MemberCard/>
<MembersTableBabeClass/>
  </div>
</template>

<script lang="ts" setup>
 definePageMeta({
  layout:'member',
  middleware:'auth'
 })

 const alertmessage = ref('')
 const memberStore = useMemberStore()
const items = ref({ username: '' })

onMounted(async () => {
  await memberStore.fetchMembers()
  const member = memberStore.members[0] || {}
  items.value = {
    username: member.userName || ''
  }
})

 const date = new Date()
 const current = date.getHours();

 if(current < 12){
  alertmessage.value = "Good Morning"
 }else if(current >=12 && current < 18){
  alertmessage.value = "Good Afternoon"
//   const voice = new SpeechSynthesisUtterance('good afternoon')
//  window.speechSynthesis.speak(voice)
 }else{
  alertmessage.value = "Good Evening"
 }
 
</script>

<style>

</style>