<template>
  <div class="p-5">
    <div class="flex justify-between items-center py-5">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        v-model="searchQuery"
        placeholder="Search..."
      />
      <UButton class="bg-blue-500 hover:bg-blue-400" :to="`/Member-Dashboard/StudentForm/babe-class`">ADD NEW</UButton>
    </div>
    <div class="flex gap-4" :class="{ 'flex-col': !showForm, 'flex-row': showForm }">
      <div :class="showForm ? 'w-1/2' : 'w-full'">
        <UCard>
          <UTable :rows="paginatedMembers" :columns="columns">
            <template #studentReport-data="{ row }">
              <a v-if="row.studentReport" :href="row.studentReport.url" target="_blank" class="text-blue-500 hover:underline">
                {{ row.firstName }} Report
              </a>
              <span v-else>No Report</span>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

        
          <div class="flex justify-between items-center mt-4">
            <span class="text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex gap-3 items-center">
              <UButton
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-gray-300 rounded-md"
                icon="i-heroicons-chevron-left"
              />
              <UButton
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-gray-300 rounded-md"
                icon="i-heroicons-chevron-right"
              />
            </div>
          </div>
        </UCard>
      </div>

      <div v-if="showForm" class="w-1/2 px-4">
    
        <UpdateStudent :student="selectedStudent" v-if="selectedStudent" @close="closeCard" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStudentStore } from '../../stores/student';
import type { Students } from '~/type';
import UpdateStudent from './updateStudent.vue';

definePageMeta({
  layout: 'dashboard'
});


const studentStore = useStudentStore(); 
const items = (row: any) => [
  [
    {
      label: 'Edit Student',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        selectedStudent.value = row;
        showForm.value = true;
      }
    },
    {
      label: 'Delete Student',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          const confirmation = confirm('Are you sure you want to delete this student?');
          if (confirmation) {
            const voice = new SpeechSynthesisUtterance('Student already deleted');
            window.speechSynthesis.speak(voice);
            await studentStore.deleteStudent(row._id); 
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        }
      }
    },
  ]
];

const columns = [
  { key: 'studentReport', label: 'Student report' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'age', label: 'Age' },
  { key: 'sex', label: 'Sex' },
  { key: 'grade', label: 'Class' },
  { key: 'actions', label: 'Actions' }
];


const searchQuery = ref('');


const currentPage = ref(1);
const itemsPerPage = ref(5); 

const showForm = ref(false);
const selectedStudent = ref<Students | null>(null);


function closeCard() {
  showForm.value = false;
  selectedStudent.value = null;
}


onMounted(async () => {
  await studentStore.fetchStudent(); 
});


const filteredStudents = computed(() => {
  if (!studentStore.students) return [];
  return studentStore.students.filter(student => {
    return (
      student.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});


const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / itemsPerPage.value);
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredStudents.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<style scoped>

</style>
