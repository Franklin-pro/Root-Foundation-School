<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '~/stores/members';
import icons from '~/assets/iconx.png';
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
    <UCard class="w-[50%]">
      <div class="relative flex justify-center items-center">
        <div class="relative">
          <img :src="imagePreview" alt="User Image" class="w-20 h-20 rounded-full object-cover bg-gray-200" />
          <label
            for="image-upload"
            class="absolute inset-0 flex justify-center items-center text-3xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <UIcon name="heroicons-camera" />
          </label>
        </div>
        <input id="image-upload" type="file" class="hidden" @change="onFileChange" accept="image/*" />
      </div>

      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Username" name="username">
          <UInput v-model="state.userName" />
        </UFormGroup>

        <UFormGroup label="Course" name="course">
          <UInput v-model="state.course" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Role" name="role">
          <UInput v-model="state.role" />
        </UFormGroup>

        <button type="submit" class=" w-[50%] bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
         Create Member
        </button>
      </UForm>
    </UCard>
  </div>
</template>
