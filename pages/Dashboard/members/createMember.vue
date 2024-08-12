<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
definePageMeta({
  layout:'dashboard'
})
const state = reactive({
  email: undefined,
  username:undefined,
  course:undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.username) errors.push({ path: 'username', message: 'Required' })
  if (!state.course) errors.push({ path: 'course', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}

const countries = ['Admin', 'Member']

const country = ref(countries[0])
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-primary">CREATING NEW USER</h1>
  </div>
  
  <UCard>
    <div class="flex justify-center items-center">
      <img src="/assets/iconx.png" alt="" class="w-[100px] rounded-full">
      <UIcon name="heroicons-camera" class="absolute cursor-pointer text-3xl text-black font-bold"/>
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="UserName" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Course" name="course">
      <UInput v-model="state.course" />
    </UFormGroup>


    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Role">
      <USelect v-model="country" :options="countries" />
    </UFormGroup>
  
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
  </UCard>
 
</template>





<style>

</style>