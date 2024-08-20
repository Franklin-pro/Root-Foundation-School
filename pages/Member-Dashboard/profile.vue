<template>
  <div>
    <h1 class="font-bold py-5 text-3xl text-primary">PROFILE</h1>
    <div class="flex items-center justify-center w-full">
      <div class="w-[50%]">
        <UCard>
          <div class="flex justify-center flex-col items-center">
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
            <h1 class="py-2 font-semibold text-primary text-xl">{{ state.username }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Email Address :</strong>
            <h1>{{ state.email }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">UserName :</strong>
            <h1>{{ state.username }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Course :</strong>
            <h1>{{ state.course }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Role :</strong>
            <h1>{{ state.role }}</h1>
          </div>

          <div class="py-4">
            <UButton @click="showModal = true">Update Profile <UIcon name="i-heroicons-pencil-20-solid"/></UButton>
          </div>
        </UCard>
      </div>
    </div>

    <Modal on @onUpdate="fetchUserData"/>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import axios from 'axios'
import icons from '../../assets/admin.jpg'
import Modal from '../../components/Modal.vue'

definePageMeta({
  layout: 'dashboard'
})

const state = reactive({
  email: 'franklinprogrammer@gmail.com',
  username: 'Franklin',
  course: 'English',
  role: 'Admin',
  image: null as File | null,
})

const showModal = ref(false)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    state.image = target.files[0]
  }
}

const imagePreview = computed(() => {
  return state.image ? URL.createObjectURL(state.image) : icons
})

const updateProfile = async () => {
  const formData = new FormData()
  if (state.image) {
    formData.append('image', state.image)
  }
  formData.append('email', state.email)
  formData.append('username', state.username)
  formData.append('username', state.course)
  formData.append('role', state.role)
  
  try {
    const response = await axios.post('/api/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Profile updated successfully:', response.data)
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

const fetchUserData = async () => {
  try {
    const response = await axios.get('/api/get-user-profile')
    state.email = response.data.email
    state.username = response.data.username
    state.username = response.data.course
    state.role = response.data.role
    // Update profile image if needed
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
</script>
