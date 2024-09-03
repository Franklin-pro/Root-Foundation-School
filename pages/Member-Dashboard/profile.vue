<template>
  <div>
    <h1 class="font-bold py-5 text-3xl text-primary">PROFILE</h1>
    <div class="flex items-center justify-center w-full">
      <div class="w-[50%]">
        <UCard>
          <div class="flex justify-center flex-col items-center">
            <div class="relative flex justify-center items-center">
              <div class="relative">
                <img :src="imagePreview" 
                     alt="User Image" 
                     class="w-20 h-20 rounded-full object-cover bg-gray-200">
                <label for="image-upload" 
                       class="absolute inset-0 flex justify-center items-center text-3xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <UIcon name="heroicons-camera" />
                </label>
              </div>
              <input id="image-upload" type="file" class="hidden" @change="onFileChange" accept="image/*"/>
            </div>
            <h1 class="py-2 font-semibold text-primary text-xl">{{ currentMember?.userName }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Email Address :</strong>
            <h1>{{ currentMember?.email }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">UserName :</strong>
            <h1>{{ currentMember?.userName }}</h1>
          </div>
          <div class="flex gap-4 py-4 justify-between">
            <strong class="text-xl">Role :</strong>
            <h1>{{ currentMember?.role }}</h1>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useMemberStore } from '~/stores/members';
import icons from '~/assets/admin.jpg';
import type { Member } from '~/type';
import { useRoute } from 'vue-router'; 

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute();
const memberStore = useMemberStore();
const id = route.params.id as string;

const currentMember = computed(() => memberStore.currentMember); 
const imagePreview = computed(() => {
  if (currentMember.value?.memberImage) {
    if (typeof currentMember.value.memberImage === 'string') {
      return currentMember.value.memberImage;
    } else {
      return URL.createObjectURL(currentMember.value.memberImage);
    }
  }
  return icons;
});

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    const imageUrl = URL.createObjectURL(file);
    currentMember.value!.memberImage = imageUrl; 
   
  }
};

onMounted(async () => {
  await memberStore.fetchMember(id);
});
</script>
