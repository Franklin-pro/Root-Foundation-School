<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'member'
})

const state = reactive({
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  class: 'babe-class',
  sex: 'Male',
  attachment: null as File | null,
})

const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (!state.firstname) errors.push({ path: 'firstname', message: 'Required' })
  if (!state.lastname) errors.push({ path: 'lastname', message: 'Required' })
  if (!state.dateOfBirth) errors.push({ path: 'dateOfBirth', message: 'Required' })
  return errors
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    state.attachment = target.files[0]
  }
}

const router = useRouter()

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault()

  const errors = validate(state)
  if (errors.length) {
    console.error(errors)
    return
  }

  const formData = new FormData()
  formData.append('firstname', state.firstname)
  formData.append('lastname', state.lastname)
  formData.append('dateOfBirth', state.dateOfBirth)
  formData.append('class', state.class)
  formData.append('sex', state.sex)
  if (state.attachment) {
    formData.append('attachment', state.attachment)
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    const result = await response.json()
    console.log('User created:', result)
    router.push('/users')
  } catch (error) {
    console.error('Error:', error)
  }
}

const roles = ['babe-class', 'middle-class', 'top-class']
const sexes = ['Male', 'Female']

const attachmentName = computed(() => {
  return state.attachment ? state.attachment.name : 'No file selected'
})
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-primary">CREATING NEW Student (Middle-Class)</h1>
  </div>
  
  <UCard>
    <div class="relative flex flex-col items-center space-y-4">
      <label for="file-upload" class="flex flex-col items-center cursor-pointer">
        <span class="text-lg font-medium">Upload File</span>
        <span class="text-gray-500">{{ attachmentName }}</span>
      </label>
      <input id="file-upload" type="file" class="hidden" @change="onFileChange" />
    </div>

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="FirstName" name="firstname">
        <UInput v-model="state.firstname" placeholder="FirstName" />
      </UFormGroup>

      <UFormGroup label="LastName" name="lastname">
        <UInput v-model="state.lastname" placeholder="LastName" />
      </UFormGroup>

      <UFormGroup label="Date of Birth" name="dateOfBirth">
        <UInput v-model="state.dateOfBirth" type="date" />
      </UFormGroup>

      <UFormGroup label="Sex" name="sex">
        <USelect v-model="state.sex" :options="sexes" />
      </UFormGroup>

      <UFormGroup label="Class" name="class">
        <USelect v-model="state.class" :options="roles" />
      </UFormGroup>
    
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
/* Additional styles if needed */
</style>
