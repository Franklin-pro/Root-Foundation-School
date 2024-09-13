<template>
  <div>
    <h3 class="text-3xl font-semibold text-blue-500">Ask Admin </h3>
    <div class="mt-6 overflow-hidden rounded-xl">
                <div class="px-6 py-12 sm:p-12">
                    <form @submit.prevent="onSubmit" class="mt-14">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <div>
                                <label for="" class="text-base font-medium text-gray-900"> Your name </label>
                                <div class="mt-2.5 relative">
                                    <input type="text" name="" id="" placeholder="Full Name" v-model="state.fullName" class="block w-full px-4 py-4  placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                </div>
                            </div>
                            <div>
                                <label for="" class="text-base font-medium text-gray-900"> Class Name </label>
                                <div class="mt-2.5 relative">
                                    <input type="text" name="" id="" placeholder="Class Name" v-model="state.className" class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="" class="text-base font-medium text-gray-900"> Message </label>
                                <div class="mt-2.5 relative">
                                    <textarea name="" id=""placeholder="Message..." v-model="state.message" class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useMessageStore } from '~/stores/messages';
  import type { ChatFormState} from '~/type';

  const state = reactive<ChatFormState>({
    fullName: '',
    className: '',
    message: '',

  });
  definePageMeta({
    layout:'member',
    middleware:'auth'
  })

  const messageStore = useMessageStore();

const validate = (state: ChatFormState): boolean => {
  return (
    state.fullName.trim() !== '' &&
    state.className.trim() !== '' &&
    state.message.trim() !== ''
  );
};

  const onSubmit = async () => {
    if (!validate(state)) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      await messageStore.createChat(state);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  </script>

<style>

</style>