<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '~/stores/members';
import icons from '~/assets/iconx.png';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type {  StudentFormState } from '~/type';

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
const studentStore =useStudentStore();

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
    <h1 class="font-extrabold text-2xl text-blue-600">CREATING NEW Student</h1>
  </div>
  <div class="flex justify-center">
    <UCard class="w-[50%] ">
    <div class="relative flex flex-col items-center space-y-4">
      <label for="file-upload" class="flex flex-col items-center cursor-pointer">
        <span class="text-lg font-medium">Upload Report</span>
        <span class="text-gray-500">{{ attachmentName }}</span>
      </label>
      <input id="file-upload" name="studentReport" type="file" class="hidden" @change="onFileChange" />
    </div>

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="FirstName" name="firstname">
        <UInput v-model="state.firstName" placeholder="FirstName" />
      </UFormGroup>

      <UFormGroup label="LastName" name="lastname">
        <UInput v-model="state.lastName" placeholder="LastName" />
      </UFormGroup>

      <UFormGroup label="Date of Birth" name="dateOfBirth">
        <UInput v-model="state.age" type="text" />
      </UFormGroup>

      <UFormGroup label="Sex" name="sex">
        <UInput v-model="state.sex" type="text" />
      </UFormGroup>

      <UFormGroup label="Class" name="class">
        <UInput v-model="state.grade"/>
      </UFormGroup>
    
      <UButton type="submit" class="px-8 bg-blue-500 hover:bg-blue-400">
        Submit
      </UButton>
    </UForm>
  </UCard>
  </div>

</template>

<style scoped>

</style>
