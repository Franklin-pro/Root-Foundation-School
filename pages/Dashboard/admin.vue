<template>
  <div class="w-full">
    <h1 class="pb-5 text-xl"><strong class="text-gray-700">{{ alertmessage }}</strong> Franklin</h1>
  <Card/>
  <Table/>
  <MemberTable/>
  </div>
</template>

<script lang="ts" setup>
 definePageMeta({
  layout:'dashboard'
 })

 const alertmessage = ref('')

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