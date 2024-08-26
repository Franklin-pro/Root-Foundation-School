<template>
  <div class="p-5">
    <div class="flex items-center justify-between py-5">
      <h1 class="font-bold text-2xl text-primary">Members List</h1>
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
        v-model="searchQuery"
      />
      <UButton to="/Dashboard/members/createMember">Create New</UButton>
    </div>
    <div class="flex gap-4" :class="{ 'flex-col': !showForm, 'flex-row': showForm }">
   <div :class="showForm ? 'w-1/2' : 'w-full'">
    <UCard>
      <UTable :columns="columns" :rows="filteredMembers">
        <template #memberImage-data="{ row }">
        <img :src="row.memberImage.url" alt="Product Image" class="h-10 w-10 object-cover rounded-full"/>
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
         <UpdateMember :member="selectedMember" v-if="selectedMember" @close="closeCard"/>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useMemberStore } from '../../../stores/members'; 
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
            const voice = new SpeechSynthesisUtterance('member already deleted')
            window.speechSynthesis.speak(voice)
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
{ key: 'memberImage', label: 'User Image' },
  { key: 'userName', label: 'User Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'course', label: 'Course' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'action' }
];

const searchQuery = ref('');
const showForm = ref(false);
const selectedMember = ref<Member | null>(null); // Define selectedMember
const memberStore = useMemberStore(); 

const selectMember = (member: Member) => {
  selectedMember.value = member;
};
function closeCard() {
  showForm.value = false; 
  selectedMember.value = null; 
}

onMounted(async () => {
  await memberStore.fetchMembers(); 
});


const filteredMembers = computed(() => {
  if (!memberStore.members) return [];
  return memberStore.members.filter(member => {
    return (
      member.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.course.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>

<style>
/* Add any necessary styling here */
</style>
