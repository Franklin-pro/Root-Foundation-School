import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type{ Chat, ChatFormState, Message,MessageFormState } from '~/type';


interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([]);
  const chats = ref<Chat[]>([]);
  const currentMessage = ref<Message | null>(null);
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await axios.get<ApiResponse<Message[]>>('https://root-found-bn.onrender.com/v1/messages');
      messages.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const createMessage = async (data: MessageFormState) => {
    try {
      const response = await axios.post<ApiResponse<Message>>('https://root-found-bn.onrender.com/v1/messages', data);
      messages.value.push(response.data.datas);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to create message', error);
    }
  };
  const createChat = async (data: ChatFormState) => {
    try {
      const response = await axios.post<ApiResponse<Chat>>('https://root-found-bn.onrender.com/v1/chats', data);
      chats.value.push(response.data.datas);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to create message', error);
    }
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get<ApiResponse<Chat[]>>('https://root-found-bn.onrender.com/v1/chats');
      chats.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };
  const deleteChat = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://root-found-bn.onrender.com/v1/chats/${id}`);
      chats.value = chats.value.filter(message => message.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://root-found-bn.onrender.com/v1/messages/${id}`);
      messages.value = messages.value.filter(message => message.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  return { messages,chats, currentMessage,createChat, fetchMessages,fetchChats,deleteChat, createMessage, deleteMessage };
});