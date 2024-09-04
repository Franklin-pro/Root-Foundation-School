<template>
  <div class="grid lg:grid-cols-2 md:grid-cols sm:grid-cols gap-4">
    <div v-for="item in items" :key="item.path" class="w-full">
      <UCard class="w-full flex flex-col">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="font-light text-xl text-orange-400">{{ item.text }}</h1>
            <h2 class="font-bold text-2xl text-primary">{{ item.number }}</h2>
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
const student = useStudentStore();
const items = ref([]);

onMounted(async () => {
  await member.fetchMembers();
  await student.fetchStudent();
  const memberCount = member.members.length; 
  const studentCount = student.members.length;

  items.value = [
    {
      text: "Members",
      number: memberCount,
      path: "/Dashboard/members/view-members"
    },
    {
      text: "Students",
      number: studentCount,
      path: "/Dashboard/Students/babe-class"
    },
    // {
    //   text: "Middle-Class",
    //   number: memberCount,
    //   path: "/Dashboard/Students/middle-class"
    // },
    // {
    //   text: "Top-Class",
    //   number: memberCount,
    //   path: "/Dashboard/Students/top-class"
    // }
  ];
});
</script>
