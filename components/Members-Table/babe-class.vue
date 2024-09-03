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
      <UButton :to="`/Member-Dashboard/StudentForm/babe-class`">ADD NEW</UButton>
    </div>
    <div class="flex gap-4" :class="{ 'flex-col': !showForm, 'flex-row': showForm }">
      <div :class="showForm ? 'w-1/2' : 'w-full'">
        <UCard>
          <UTable :rows="filteredMembers" :columns="columns">
            <template #studentReport-data="{ row }">
              <a v-if="row.studentReport" :href="row.studentReport.url" target="_blank" class="text-blue-500 hover:underline">
                {{ row.firstName }}Report
              </a>
              <span v-else>No Report</span>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>
        </UCard>
      </div>
      <div v-if="showForm" class="w-1/2 px-4">
        <!-- Pass selectedStudent directly as the student prop -->
        <UpdateStudent :student="selectedStudent" v-if="selectedStudent" @close="closeCard"/>
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
      label: 'Delete member',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          const confirmation = confirm('Are you sure you want to delete this student?');
          if (confirmation) {
            const voice = new SpeechSynthesisUtterance('Student already deleted');
            window.speechSynthesis.speak(voice);
            await StudentStore.deleteStudent(row._id);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        }
      }
    },
    {
      label: 'View Details',
      icon: 'i-heroicons-eye-20-solid',
      click: () => {
        // router.push(`/Dashboard/members/details/${row._id}`);
      }
    }
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
const showForm = ref(false);
const selectedStudent = ref<Students | null>(null);
const StudentStore = useStudentStore();

const selectStudent = (student: Students) => {
  selectedStudent.value = student;
};

function closeCard() {
  showForm.value = false;
  selectedStudent.value = null;
}

onMounted(async () => {
  await StudentStore.fetchStudent();
});

const filteredMembers = computed(() => {
  if (!StudentStore.members) return [];
  return StudentStore.members.filter(member => {
    return (
      member.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.grade.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>
