<template>
  <div>
    <h1 class="py-5 text-3xl font-semibold text-primary-500">Messages From Clients</h1>
    <div class="border rounded-xl border-gray-400 p-4">
      <div class="grid lg:grid-cols-2 gap-4">
        <div v-for="item in messages" :key="item.id">
          <div>
            <div class="flex py-4 gap-4">
              <h1 class="text-md font-bold text-primary-400">Email Address: <span>{{ item.email }}</span></h1> |
              <h1 class="text-md font-bold text-primary-400">Phone Number: <span>{{ item.phoneNumber }}</span></h1>
            </div>
            <div class="border flex justify-between p-4 border-gray-500 rounded-xl">
              <div>
                <h3 class="font-bold pb-4 text-orange-400">Message From <span>{{ item.fullName }}</span></h3>
                <p>{{ item.message }}</p>
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
import { onMounted } from 'vue'; // import onMounted
const colorMode = useColorMode(); 
 definePageMeta({
  layout:'dashboard',
  middleware:'auth'
 })
const messageStore = useMessageStore();

const deleteMessage =async (id:string)=>{
  await messageStore.deleteMessage(id)
}

const messages = computed(() => messageStore.messages);

onMounted(async () => {
  await messageStore.fetchMessages();
});
</script>

<style></style>
