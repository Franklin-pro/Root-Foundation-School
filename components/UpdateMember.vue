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

          <div class="grid gap-3 lg:grid-cols-2 pb-6">
            <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="userName" v-model="member.userName"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
        <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Role" v-model="member.role"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
               <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Course" v-model="member.course"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
        <div class="mt-2.5 relative">
          <input type="text" name="" id="" placeholder="Email Address" v-model="member.email"
            class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
        </div>
          </div>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <button type="button" @click="updateMember" class="w-full bg-blue-500  flex items-center gap-3 justify-center text-white py-2 rounded hover:bg-blue-600">
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
import { useMemberStore } from '~/stores/members';
import type { Member, UpdateMember as UpdateMemberType } from '~/type';

const props = defineProps<{ member: Member | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const member = ref<Member>({
  id: '', 
  _id: '',
  userName: '',
  role: '',
  url:'',
  course: '',
  email: '',
  memberImage:''
});

watch(() => props.member, (newMember) => {
  if (newMember) {
    member.value = { ...newMember };
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
