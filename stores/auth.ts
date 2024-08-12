import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import axios from "axios"
import type{ Create,Login,User } from "~/type"
interface ApiResponse<T>{
message : String,
data : T
}

export const useMyAuthStore = defineStore('user',()=>{
const user = ref<User | null>(null);
const token = ref<String | null>(null);
const router = useRouter();

const setUser = (data:User | null)=> {
user.value = data;

if(data){
  localStorage.setItem('user',JSON.stringify(data))
}else{
  localStorage.removeItem('user')
}
}

const setToken = (data: string | null)=>{
token.value = data

if(data){
  localStorage.setItem('token',JSON.stringify(data))
}else{
  localStorage.removeItem('token')
}
}

onBeforeMount(()=>{
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  if(storedToken){
    token.value = storedToken
  }
  if(storedUser){
    user.value = JSON.parse(storedUser)
  }
})

const createAccount = async (data : Create)=>{
try {
  const response = await $fetch<ApiResponse<User>>('http://localhost:3030/create',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'Application/json',
    },
  })
  alert(response.message)
} catch (error) {
  console.error('fail to create account',error)
}
};
const signIn = async (data: Login) => {
  const validatePassword = (password: string) => password.length >= 8;

  if (!validatePassword(data.password)) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  try {
    const response = await fetch("http://localhost:3030/user/login", {
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
    } else {
      throw new Error('Token not found in response');
    }

    if (result.data && result.data.user) {
      setUser(result.data.user);
      alert('Login successful');

      if (result.data.user.role === 'admin') {
        await router.replace('/dashboard/dash');
      } else {
        await router.replace('/');
      }
      return result.data.user;
    } else {
      throw new Error('User data not found in response');
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      alert('Invalid email or password. Please try again.');
    } else {
      setToken(null);
      setUser(null);

      console.error('Failed to sign in:', error);
      alert('An error occurred during login. Please try again later.');
      throw error;
    }
  }
};

const logout = async ()=> {
  setToken(null);
  setUser(null);
  await router.push('/login')
}

return {user,token,setToken,setUser, createAccount,signIn,logout}
})
