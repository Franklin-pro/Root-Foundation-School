<template>
  <div>
<MemberTable/>
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
