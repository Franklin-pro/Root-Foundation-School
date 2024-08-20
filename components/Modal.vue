<!-- Modal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Update Profile</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email Address</label>
          <input v-model="form.email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="form.username" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <input v-model="form.role" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="flex gap-4">
          <button type="button" @click=" false" class="px-4 py-2 bg-gray-300 text-white rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { any } from 'zod';

const props = defineProps(['visible', 'onUpdate'])

const emit = defineEmits(['update:visible'])

const form = ref({
  email: 'franklin@gmail.com',
  username: 'franklin',
  role: 'admin'
})

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('email', form.value.email)
  formData.append('username', form.value.username)
  formData.append('role', form.value.role)
  
  try {
    await axios.post('/api/update-profil', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    emit('update:visible', false) // Close modal
    props.onUpdate() // Notify parent about the update
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
