<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import icons from '../../../assets/iconx.png'

definePageMeta({
  layout: 'dashboard'
})

const state = reactive({
  email: '',
  username: '',
  course: '',
  password: '',
  role: 'Admin',
  image: null as File | null,
})

const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.username) errors.push({ path: 'username', message: 'Required' })
  if (!state.course) errors.push({ path: 'course', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    state.image = target.files[0]
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
  formData.append('email', state.email)
  formData.append('username', state.username)
  formData.append('course', state.course)
  formData.append('password', state.password)
  formData.append('role', state.role)
  if (state.image) {
    formData.append('image', state.image)
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

const roles = ['Admin', 'Member']

const imagePreview = computed(() => {
  return state.image ? URL.createObjectURL(state.image) : icons
})
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-primary">CREATING NEW USER</h1>
  </div>
  
  <UCard>
    <div class="relative flex justify-center items-center">
      <div class="relative">
        <img :src="imagePreview" 
             alt="User Image" 
             class="w-20 h-20 rounded-full object-cover bg-gray-200">
        <label for="image-upload" 
               class="absolute inset-0 flex justify-center items-center text-3xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
          <UIcon name="heroicons-camera" />
        </label>
      </div>
      <input id="image-upload" type="file" class="hidden" @change="onFileChange" accept="image/*"/>
    </div>

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup label="Course" name="course">
        <UInput v-model="state.course" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UFormGroup label="Role" name="role">
        <USelect v-model="state.role" :options="roles" />
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
