<template>
  <div>
   
    <div class=" rounded-xl p-4">
      <div class="p-3 flex justify-between items-center">
        <h1 class="py-5 text-3xl font-semibold text-primary-500">Messages From Clients</h1>
        <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        color="white"
        :trailing="false"
        placeholder="Search..."
        v-model="searchQuery"
      />
      </div>
  
      <div class="grid lg:grid-cols-2 gap-4">
        <div v-for="item in filteredMembers" :key="item.id">
          <div>
            <div class="flex py-4 gap-4">
              <h1 class="text-md font-bold text-gray-500">Email: <span>{{ item.email }}</span></h1> |
              <h1 class="text-md font-bol text-gray-500"> Phone Number: <span>(+250){{item.phoneNumber }}</span></h1>
            </div>
            <div class="border flex justify-between p-4 border-orange-400 rounded-xl">
              <div>
                <h3 class="font-bold pb-4 text-orange-400">Message From <span>{{ item.fullName }}</span></h3>
                <p class="py-2">{{ item.message }}</p> 
              </div>
              <div>
                <UTooltip text="delete message">
                  <UIcon name="i-heroicons-trash" class="text-xl cursor-pointer hover:bg-orange-600 duration-500" @click="deleteMessage(item._id)" />
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore } from '~/stores/messages';
import { onMounted } from 'vue'; 
const colorMode = useColorMode(); 
 definePageMeta({
  layout:'dashboard',
  middleware:'auth'
 })
 const searchQuery = ref('');
const messageStore = useMessageStore();

const filteredMembers = computed(() => {
  if (!messageStore.messages) return [];
  return messageStore.messages.filter(message => {
    return (
      message.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      message.campanyName.toLowerCase().includes(searchQuery.value.toLowerCase())
     
    );
  });
});

const deleteMessage =async (id:string)=>{
  await messageStore.deleteMessage(id)
}

const messages = computed(() => messageStore.messages);

onMounted(async () => {
  await messageStore.fetchMessages();
});
</script>

<style></style>
