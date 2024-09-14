<template>
  <div>
    <div>
      <h1 class="font-black pb-5 text-3xl text-primary"> Profile Setting</h1>
    </div>
    <div class="flex items-center justify-center w-full">
      <div class="w-[50%]">
        <UCard>
          <div class=" flex justify-center flex-col items-center">
            <div class="relative flex justify-center items-center">
              <UChip position="bottom-right" size="2xl" class="absolute bottom-3 right-3" >
              </UChip>
                <img :src="member?.memberImage?.url" 
                   alt="User Image" 
                   class="w-20 h-20 rounded-full object-cover bg-gray-200">
                  
            </div>

            <h1 class="py-2 font-semibold text-orange-400 text-xl">{{ member?.userName }}</h1>
          </div>
          <div class="flex gap-4 mb-3 p-4 border border-gray-500 rounded-xl justify-between">
            <div class="text-xl font-semibold text-primary">Email Address:</div>
            <div class="text-xl font-light">{{ member?.email }}</div>
          </div>
          <div class="flex gap-4 mb-4 p-4 border border-gray-500 rounded-xl justify-between">
            <div class="text-xl font-semibold text-primary">Username:</div>
            <div class="text-xl font-light">{{ member?.userName }}</div>
          </div>
          <div class="flex mb-4 gap-4 border border-gray-500 rounded-xl p-4 justify-between">
            <div class="text-xl font-semibold text-primary">Role:</div>
            <div class="text-xl font-light">{{ member?.role }}</div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import type { Member } from '~/type';

const route = useRoute();
definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const memberStore = useMemberStore();
const memberId = ref<string>(id); 
const member = ref<Member | null>(null); 

onMounted(async () => {
  if (memberId.value) {
    member.value = await memberStore.fetchMember(memberId.value);  
  }
});
</script>



<style scoped>

</style>
