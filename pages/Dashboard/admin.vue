<template>
  <div class="w-full">
  <h1 class="pb-5 text-4xl"> {{ alertmessage }} franklin</h1>
  <Card/>
  <Table/>
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
  alertmessage.value = "good Morning"
 }else if(current >=12 && current < 18){
  alertmessage.value = "good afternoon"
//   const voice = new SpeechSynthesisUtterance('good afternoon')
//  window.speechSynthesis.speak(voice)
 }else{
  alertmessage.value = "good evening"
 }
 
</script>

<style>

</style>