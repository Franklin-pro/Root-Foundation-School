<template>
  <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="flex items-center justify-center px-4 py-10 bg-blue-50 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <div class="pb-5">
            <h2 class="text-3xl font-bold leading-tight text-blue-500 sm:text-4xl">Login to Your Account</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="space-y-5">
              <div>
                <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                <div class="mt-2.5">
                  <UFormGroup name="email">
                    <UInput v-model="state.email" size="lg" />
                  </UFormGroup>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="" class="text-base font-medium text-gray-900"> Password </label>
                </div>
                <div class="mt-2.5">
                  <UFormGroup name="password">
                    <UInput v-model="state.password" size="lg" type="password" />
                  </UFormGroup>
                </div>
              </div>

              <div>
                <UButton
                  type="submit"
                  :loading="isLoading"
                  :disabled="isLoading" 
                  class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                  <span v-if="!isLoading">Log in</span>
                  <span v-else>Logging in...</span> 
                </UButton>
              </div>
            </div>
          </UForm>
        </div>
      </div>

      <div class="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
        <div>
          <img class="w-[400px] mx-auto" src="../assets/loginve.avif" alt="" />
          <div class="w-full max-w-md mx-auto xl:max-w-xl">
            <h3 class="text-2xl font-bold text-center text-blue-500">Root Foundation</h3>
            <p class="leading-relaxed text-center text-gray-500 mt-2.5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMemberStore } from '~/stores/members';
import type { FormError, FormSubmitEvent } from '#ui/types';


const state = reactive({
  email: '',
  password: '',
  userName: ''
});

const isLoading = ref(false);  

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

const memberStore = useMemberStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(state);
  if (errors.length > 0) {
    console.log('Validation errors:', errors);
    return;
  }

  isLoading.value = true; 

  try {
    await memberStore.login({ email: state.email, password: state.password, userName: state.userName });

  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
