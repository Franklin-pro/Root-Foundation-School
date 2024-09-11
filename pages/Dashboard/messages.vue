<template>
  <div>
    <h1 class="py-5 text-3xl font-semibold text-primary-500">Messages From Clients</h1>
    <div class=" border rounded-xl border-gray-400 p-4">
      <div class="grid lg:grid-cols-2 gap-4">
        <div v-for="item in items" :key="item.id">
          <div>
          <div class="flex py-4 gap-4">
            <h1 class="text-md font-bold text-primary-400">Email Address : <span>{{item.email}}</span></h1> |
            <h1 class="text-md font-bold text-primary-400">Phone Number : <span>{{ item.phone }}</span></h1>
          </div>
          <div class="border flex justify-between p-4 border-gray-500 rounded-xl">
            <div>
              <h3 class="font-bold pb-4 text-orange-400">Message From <span>{{ item.userName }}</span></h3>
              <p>{{ item.message }}</p>
            </div>
            <div>
              <UTooltip text="delete message">
                <UIcon name="i-heroicons-trash" class="text-xl cursor-pointer hover:bg-orange-600 duration-500"/>
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
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
const colorMode = useColorMode()

const items = [
  {
    id:1,
    email:"example1@gmail.com",
    phone:"0780019548",
    userName:"Franklin",
    message:"hello world press"
  },
  {
    id:2,
    email:"example2@gmail.com",
    phone:"0788019524",
    userName:"Tony Sylva",
    message:"hello world "
  },
  {
    id:3,
    email:"example3@gmail.com",
    phone:"0790019549",
    userName:"King Von",
    message:"hello world kingvon"
  },
]

</script>
<style></style>