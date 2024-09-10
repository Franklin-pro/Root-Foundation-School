<template>
  <div class="grid lg:grid-cols-2 md:grid-cols px-4 sm:grid-cols gap-4">
    <div v-for="item in items" :key="item.path" class="w-full">
      <UCard class="w-full flex flex-col">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="font-semibold text-xl">{{ item.text }}</h1>
            <h2 class="font-extrabold text-blue-500 text-2xl">{{ item.number }}</h2>
          </div>
          <div>
            <NuxtLink :to="item.path">
              <UIcon name="i-heroicons-eye-20-solid" class="hover:text-blue-400"  />
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
  const studentCount = student.students.length;
  const memberCount = member.members.length; 

  items.value = [
    {
      text: "Members",
      number: memberCount,
    },
    {
      text: "Students",
      number: studentCount,
      path: "/Member-Dashboard/View-Students/students"
    },
  ];
});
</script>
