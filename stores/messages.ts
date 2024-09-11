import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type{ Message,MessageFormState } from '~/type';


interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([]);
  const currentMessage = ref<Message | null>(null);
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await axios.get<ApiResponse<Message[]>>('http://localhost:3030/v1/messages');
      messages.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const fetchMessage = async (id: string): Promise<Message> => {
    try {
      const response = await axios.get<ApiResponse<Message>>(`http://localhost:3030/v1/messages/${id}`);
      return response.data.datas;
    } catch (error) {
      console.error('Failed to fetch message', error);
      throw error;
    }
  };

  const createMessage = async (data: MessageFormState) => {
    try {
      const response = await axios.post<ApiResponse<Message>>('http://localhost:3030/v1/messages', data);
      messages.value.push(response.data.datas);
      alert(response.data.message);
      // router.push('/Dashboard/messages/view-messages');
    } catch (error) {
      console.error('Failed to create message', error);
    }
  };

  // Update an existing message by ID
  const updateMessage = async (id: string, data: MessageFormState) => {
    try {
      const response = await axios.put<ApiResponse<Message>>(`http://localhost:3030/v1/messages/${id}`, data);
      const index = messages.value.findIndex(message => message.id === id);
      if (index !== -1) {
        messages.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update message', error);
    }
  };

  // Delete a message by ID
  const deleteMessage = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`http://localhost:3030/v1/messages/${id}`);
      messages.value = messages.value.filter(message => message.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  return { messages, currentMessage, fetchMessages, fetchMessage, createMessage, updateMessage, deleteMessage };
});
