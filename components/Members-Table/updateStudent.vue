<template>
  <div>
    <UCard>
      <div>
        <div class="pb-5 flex justify-between">
          <div>
            <div class="text-primary font-medium text-xl">UPDATE {{ student.firstName }}</div>
            <div class="text-[13px]">{{ student.grade }}</div>
          </div>
          <div class="flex justify-end cursor-pointer hover:text-red-400">
            <UIcon name="i-heroicons-x-mark-20-solid" class="text-3xl" @click="closeCard"/>
          </div>
        </div>

        <div class="justify-between">
          <div class="grid gap-3 lg:grid-cols-2">
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="student.firstName"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="student.lastName"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="student.age"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="student.grade"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="student.sex"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
          </div>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <button type="button" @click="updateStudent" class="w-full bg-blue-500  flex items-center gap-3 justify-center text-white py-2 rounded hover:bg-blue-600">
         <UIcon name="i-heroicons-pencil-square-16-solid" class="text-2xl"/> Update Member
        </button>
        <button type="button" @click="closeCard" class="w-full flex items-center gap-3 justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600">
         <UIcon name="i-heroicons-x-mark-16-solid" class="text-2xl"/> Cancel Action
        </button>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStudentStore } from '~/stores/student'; // Adjust the import path as necessary
import type { Students, UpdateStudent as UpdateStudentType } from '~/type';

const props = defineProps<{ student: Students | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const student = ref<Students>({
  id: '', 
  _id: '',
  firstName: '',
  lastName: '',
  age: '',
  grade: '',
  sex: '',
});

const selectedImage = ref<string | null>(null);

watch(() => props.student, (newStudent) => {
  if (newStudent && newStudent._id) {
    student.value = { ...newStudent };
    console.log('Updated student data:', student.value);
  }
}, { immediate: true });

const studentStore = useStudentStore();



const updateStudent = async () => {
  if (student.value) {
    try {
      await studentStore.updateStudent(student.value._id, student.value as UpdateStudentType);
      emit('close');
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  }
};

function closeCard() {
  emit('close');
}
</script>
