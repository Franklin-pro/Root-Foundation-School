<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStudentStore } from '../../stores/student'; 
import type { Member } from '~/type';

definePageMeta({
  layout: 'dashboard'
});

const items = (row: any) => [
  [
    {
      label: 'Edit member',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        selectedMember.value = row;
        showForm.value = true;
      }
    },
    {
      label: 'Delete member',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          const confirmation = confirm('Are you sure you want to delete this member?');
          if (confirmation) {
            const voice = new SpeechSynthesisUtterance('member already deleted');
            window.speechSynthesis.speak(voice);
            await memberStore.deleteMember(row._id);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting member:', error);
          alert('Failed to delete member.');
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
const selectedMember = ref<Member | null>(null);
const memberStore = useStudentStore();

const selectMember = (member: Member) => {
  selectedMember.value = member;
};

function closeCard() {
  showForm.value = false;
  selectedMember.value = null;
}

onMounted(async () => {
  await memberStore.fetchStudent();
});

const filteredMembers = computed(() => {
  if (!memberStore.members) return [];
  return memberStore.members.filter(member => {
    return (
      member.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.grade.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>


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
</template>
