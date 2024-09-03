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
          <div class="pb-2 flex flex-col">
            <span class="flex items-center gap-3 text-primary font-medium pb-2">
              <UIcon name="i-heroicons-image"/>Profile Image:
            </span>
            <input type="file" accept="image/*" @change="handleImageUpload"/>
            <div class="pt-2">
              <!-- Display selected image preview if needed -->
              <img v-if="selectedImage" :src="selectedImage" alt="Profile Image" class="w-24 h-24"/>
            </div>
          </div>
          <div class="grid gap-3 lg:grid-cols-2">
            <p class="pb-2 flex flex-col">
              <span class="flex items-center text-primary gap-3 font-medium pb-2">
                <UIcon name="i-heroicons-user-circle"/>First Name:
              </span>
              <UInput v-model="student.firstName" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-swatch"/>Last Name:
              </span>
              <UInput v-model="student.lastName" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-book-open"/>Age:
              </span>
              <UInput v-model="student.age" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-envelope"/>Class:
              </span>
              <UInput v-model="student.grade" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-envelope"/>Class:
              </span>
              <UInput v-model="student.sex" type="text"/>
            </p>
          </div>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <UButton color="primary" variant="solid" icon="i-heroicons-pencil-square-16-solid"
          type="button" @click="updateStudent">Update</UButton>
        <UButton color="red" variant="outline" icon="i-heroicons-x-mark-16-solid" label="Cancel"
          @click="closeCard"/>
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
  studentReport: ''
});

const selectedImage = ref<string | null>(null);

watch(() => props.student, (newStudent) => {
  if (newStudent && newStudent._id) {
    student.value = { ...newStudent };
    console.log('Updated student data:', student.value);
  }
}, { immediate: true });

const studentStore = useStudentStore();

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      selectedImage.value = reader.result as string;
      // Handle file upload logic here if needed
    };
    reader.readAsDataURL(file);
  }
};

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
