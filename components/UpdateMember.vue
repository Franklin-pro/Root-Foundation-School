<template>
  <div>
    <UCard>
      <div>
        <div class="pb-5 flex justify-between">
          <div>
            <div class="text-primary font-medium text-xl">UPDATE {{ member.userName }}</div>
            <div class="text-[13px]">{{ member.email }}</div>
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
              <input type="file"  accept="image/*"/>
              <div  class="pt-2">
              </div>
            </div>
          <div class="grid gap-3 lg:grid-cols-2">
            <p class="pb-2 flex flex-col">
              <span class="flex items-center text-primary gap-3 font-medium pb-2">
                <UIcon name="i-heroicons-user-circle"/>User Name:
              </span>
              <UInput v-model="member.userName" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-swatch"/>Role:
              </span>
              <UInput v-model="member.role" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-book-open"/>Course:
              </span>
              <UInput v-model="member.course" type="text"/>
            </p>
            <p class="pb-2 flex flex-col">
              <span class="flex items-center gap-3 text-primary font-medium pb-2">
                <UIcon name="i-heroicons-envelope"/>Email Address:
              </span>
              <UInput v-model="member.email" type="text"/>
            </p>
          </div>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <UButton color="primary" variant="solid" icon="i-heroicons-pencil-square-16-solid"
          type="button" @click="updateMember">Update</UButton>
        <UButton color="red" variant="outline" icon="i-heroicons-x-mark-16-solid" label="Cancel"
          @click="closeCard"/>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { useMemberStore } from '~/stores/members'; // Adjust the import path as necessary
import type { Member, UpdateMember as UpdateMemberType } from '~/type';

const props = defineProps<{ member: Member | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const member = ref<Member>({
  id: '', // Add this if it's required
  _id: '',
  userName: '',
  role: '',
  course: '',
  email: '',
  memberImage:''
});

watch(() => props.member, (newMember) => {
  if (newMember) {
    member.value = { ...newMember }; // Create a copy of the new member object
  }
}, { immediate: true });
const memberStore = useMemberStore();

const updateMember = async () => {
  if (member.value) {
    try {
      await memberStore.updateMember(member.value._id, member.value as UpdateMemberType);
      emit('close');
      window.location.reload()
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  }
};

function closeCard() {
  emit('close');
}
</script>
