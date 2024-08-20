<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'email is Required' })
  if (!state.password) errors.push({ path: 'password', message: 'password is Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {

  console.log(event.data)
}
</script>

<template>
  <div class="flex bg-[#FCFEFF] justify-center items-center min-h-screen">
    <UCard class="w-[400px] ">
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
   Login
    </UButton>
  </UForm>
  </UCard>
  </div>
 
  
</template>



<style>

</style>