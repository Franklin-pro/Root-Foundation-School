<template>
  <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
    <div v-for="item in items" :key="item.path" class="w-full">
      <UCard class="w-full flex flex-col">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="font-semibold text-xl text-gray-500">{{ item.text }}</h1>
            <h2 class="font-bold text-2xl">{{ item.number }}</h2>
          </div>
          <div>
            <NuxtLink :to="item.path">
              <UIcon name="i-heroicons-eye-20-solid" class="hover:text-primary" />
            </NuxtLink>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '~/stores/members'; 

const member = useMemberStore();
const items = ref([]);

onMounted(async () => {
  await member.fetchMembers();
  const memberCount = member.members.length; 

  items.value = [
    {
      text: "Members",
      number: memberCount,
      path: "/Dashboard/members/view-members"
    },
    {
      text: "Babe-Class",
      number: memberCount,
      path: "/Dashboard/Students/babe-class"
    },
    {
      text: "Middle-Class",
      number: memberCount,
      path: "/Dashboard/Students/middle-class"
    },
    {
      text: "Top-Class",
      number: memberCount,
      path: "/Dashboard/Students/top-class"
    }
  ];
});
</script>
