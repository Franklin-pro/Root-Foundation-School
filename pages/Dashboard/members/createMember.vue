<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '~/stores/members';
import icons from '~/assets/iconxx.png';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { MemberFormState } from '~/type';

const state = reactive<MemberFormState>({
  email: '',
  userName: '',
  course: '',
  password: '',
  role: '',
  memberImage: null,
});

definePageMeta({
  layout: 'dashboard',
});

const validate = (state: MemberFormState): FormError[] => {
  const errors: FormError[] = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.userName) errors.push({ path: 'username', message: 'Required' });
  if (!state.course) errors.push({ path: 'course', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  if (!state.role) errors.push({ path: 'role', message: 'Required' });
  return errors;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    state.memberImage = target.files[0];
  }
};

const router = useRouter();
const memberStore = useMemberStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(state);
  if (errors.length) {
    console.error(errors);
    return;
  }

  await memberStore.createMember(state);
}

const roles = ['Admin', 'Member'];

const imagePreview = computed(() => {
  return state.memberImage ? URL.createObjectURL(state.memberImage) : icons;
});
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-primary">Creating New User</h1>
  </div>
  <div class="flex justify-center">
    <UCard class="w-[80%]">
      <div class="relative flex flex-col justify-center items-center">
        <div class="relative">
          <img :src="imagePreview" alt="User Image" class="w-20 h-20 rounded-full object-cover bg-gray-200" />
          <label for="image-upload"
            class="absolute inset-0 flex justify-center items-center text-3xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
            <UIcon name="heroicons-camera" />
          </label>
        </div>
        <input id="image-upload" type="file" class="hidden" @change="onFileChange" accept="image/*" />
        <span class="text-orange-500">Upload Image Profile</span>
      </div>

      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          <div class="mt-2.5 relative">
          <input type="email" name="" id="" placeholder="Enter Email Address" v-model="state.email"
            class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>

        <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Enter UserName" v-model="state.userName"
            class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>

        <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Enter Course" v-model="state.course"
            class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>

        <div class="mt-2.5 relative">
          <input type="password" name="" id="" placeholder="Enter Password" v-model="state.password"
            class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>

        <div class="mt-2.5 relative col-span-2">
          <input type="text" name="" id="" placeholder="Enter Role of User" v-model="state.role"
            class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
        <div class="sm:col-span-2">
          <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
          Create Member
        </button>
        </div>
        </div>


   
      </UForm>
    </UCard>
  </div>
</template>
