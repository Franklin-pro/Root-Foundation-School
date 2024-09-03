<template>
  <div>
    <div class="grid lg:grid-cols-2 md:grid-cols sm:gap-20 justify-between min-h-screen items-center">
      <div class=" h-[65%] w-[80%] p-5 mx-[150px]">
        <div class="py-6">
            <div class="text-4xl text-primary pb-4">Login Account</div>
            <p class="font-light">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
        <div>
          <UCard class="">
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" size="lg"/>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" size="lg"/>
        </UFormGroup>

        <UButton type="submit" class="px-8 text-[18px]">Sign-In</UButton>
      </UForm>
  </UCard>
        </div>

      </div>
      <div class="w-[80%]">
<img src="/assets/login.avif" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useMemberStore } from '~/stores/members'; 
import type { FormError, FormSubmitEvent } from '#ui/types';
import toast from 'vue-toastification'

const state = reactive({
  email: '',
  password: '',
  userName:''
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

// Get the store instance
const memberStore = useMemberStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault(); 

  const errors = validate(state);
  if (errors.length > 0) {
    console.log('Validation errors:', errors);
    return;
  }

  try {
    await memberStore.login({ email: state.email, password: state.password,userName:state.userName });
  } catch (error) {
    console.error('Login failed:', error);
    alert('Failed to login. Please check your credentials and try again.');
  }
}
</script>

<style>

</style>