import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { MemberFormState, Member, UpdateMember } from '~/type';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas:T;
}


export const useMemberStore = defineStore('members', () => {
  const members = ref<Member[]>([]);
  const router = useRouter();

  const fetchMembers = async () => {
    try {
      const response = await axios.get<ApiResponse<Member[]>>('https://root-foundation.onrender.com/v1/member');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const createMember = async (data: MemberFormState) => {
    try {
      const formData = new FormData();
      if (data.memberImage) {
        formData.append('memberImage', data.memberImage);
      }
      formData.append('userName', data.userName);
      formData.append('email', data.email);
      formData.append('course', data.course);
      formData.append('password', data.password);
      formData.append('role', data.role);

      const response = await axios.post<ApiResponse<Member>>('https://root-foundation.onrender.com/v1/member', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      members.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Dashboard/members/view-members');
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  };
  
  const updateMember = async (id: string, data: UpdateMember) => {
    try {
      const response = await axios.put<ApiResponse<Member>>(`https://root-foundation.onrender.com/v1/member/${id}`, data);
      const index = members.value.findIndex(member => member.id === id);
      if (index !== -1) {
        members.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update member', error);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://root-foundation.onrender.com/v1/member/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  return { members, fetchMembers, createMember, updateMember, deleteMember };
});
