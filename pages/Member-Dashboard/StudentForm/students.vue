<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '~/stores/members';
import icons from '~/assets/iconx.png';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { StudentFormState } from '~/type';

const state = reactive<StudentFormState>({
  firstName: '',
  lastName: '',
  age: '',
  grade: '',
  sex: '',
  studentReport: null,
});

definePageMeta({
  layout: 'member',
});

const validate = (state: StudentFormState): FormError[] => {
  const errors: FormError[] = [];
  if (!state.firstName) errors.push({ path: 'firstName', message: 'Required' });
  if (!state.lastName) errors.push({ path: 'lastName', message: 'Required' });
  if (!state.age) errors.push({ path: 'age', message: 'Required' });
  if (!state.grade) errors.push({ path: 'grade', message: 'Required' });
  if (!state.sex) errors.push({ path: 'sex', message: 'Required' });
  return errors;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    state.studentReport = target.files[0];
  }
};

// const router = useRouter();
const studentStore = useStudentStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(state);
  if (errors.length) {
    console.error(errors);
    return;
  }

  await studentStore.createStudent(state);
}

const grade = ['Admin', 'Member'];

const attachmentName = computed(() => {
  return state.studentReport ? URL.createObjectURL(state.studentReport) : icons;
});
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-blue-500">CREATE NEW STUDENT</h1>
  </div>
  <div class="flex justify-center">
    <UCard class="w-[80%] ">
      <div class="relative flex flex-col text-blue-500 items-center space-y-4">
        <label for="file-upload" class="flex flex-col items-center cursor-pointer">
          <UIcon name="i-heroicons-arrow-up-on-square-stack" class="text-4xl" />
          <span class="text-lg font-medium">Upload Report</span>
          <!-- <span class="text-gray-500">{{ attachmentName }}</span> -->
        </label>
        <input id="file-upload" name="studentReport" type="file" class="hidden" @change="onFileChange" />
      </div>

      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="What Your FirstName?" v-model="state.firstName"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="What Your LastName?" v-model="state.lastName"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="type age like (21-july-2019)" v-model="state.age"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="Your Gender" v-model="state.sex"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="Which Class" v-model="state.grade"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="sm:col-span-2">
            <button type="submit"
              class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
              Upload Student
            </button>
          </div>
        </div>

      </UForm>
    </UCard>
  </div>

</template>

<style scoped></style>
