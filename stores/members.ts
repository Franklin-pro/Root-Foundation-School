import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { MemberFormState, Member, Login, User, UpdateMember } from '~/type';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useMemberStore = defineStore('members', () => {
  const members = ref<Member[]>([]);
  
  const currentMember = ref<Member | null>(null); 
  const router = useRouter();
  const user = ref<Member | null>(null);
  const token = ref<string | null>(null);

  const setToken = (data: string | null) => {
    token.value = data;
    if (data) {
      localStorage.setItem('token', data);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUser = (data: Member | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user');
    }
  };
  const setCurrentMember = (member: Member) => {
    currentMember.value = member;
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get<ApiResponse<Member[]>>('https://root-found-bn.onrender.com/v1/member');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const fetchMember = async (id: string): Promise<Member> => {
    try {
      const response = await axios.get<ApiResponse<Member>>(`https://root-found-bn.onrender.com/v1/member/${id}`);
     
      return response.data.datas; 
    } catch (error) {
      console.error('Failed to fetch member', error);
      throw error; 
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

      const response = await axios.post<ApiResponse<Member>>('https://root-found-bn.onrender.com/v1/member/', formData, {
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
      const response = await axios.put<ApiResponse<Member>>(`https://root-found-bn.onrender.com/v1/member/${id}`, data);
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
      const response = await axios.delete<ApiResponse<null>>(`https://root-found-bn.onrender.com/v1/member/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  const login = async (data: Login) => {
    const validatePassword = (password: string) => password.length >= 8;

    if (!validatePassword(data.password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('https://root-found-bn.onrender.com/v1/member/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.token) {
        setToken(result.token);
        
        if (result.data?.user) {
          setUser(result.data.user);

          alert('Login successful ✔️');

          const redirectPath = result.data.user.role === 'admin' ? '/Dashboard/admin/' : '/member-dashboard/member';
          await router.replace(redirectPath);
          return result.data.user;
        } else {
          throw new Error('User data not found in response');
        }
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again. ❌');
    }
  };

const logout = async ()=>{
setUser(null)
setToken(null)
await router.push('/login')
}
  return { members, user, token, currentMember, fetchMembers, fetchMember, login, createMember,logout, updateMember, deleteMember };
});
