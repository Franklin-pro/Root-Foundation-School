import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { StudentFormState, Students, UpdateStudent } from '~/type';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useStudentStore = defineStore('students', () => {
  const students = ref<Students[]>([]);
  const router = useRouter();

  const fetchStudent = async () => {
    try {
      const response = await axios.get<ApiResponse<Students[]>>('https://root-found-bn.onrender.com/v1/student/view');
      students.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const createStudent = async (data: StudentFormState) => {
    try {
      const formData = new FormData();
      if (data.studentReport) {
        formData.append('studentReport', data.studentReport);
      }
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('age', data.age);
      formData.append('sex', data.sex);
      formData.append('grade', data.grade);

      const response = await axios.post<ApiResponse<Students>>('https://root-found-bn.onrender.com/v1/student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      students.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Member-Dashboard/View-Students');
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  };
  
  const updateStudent = async (id: string, data: UpdateStudent) => {
    try {
      const response = await axios.put<ApiResponse<Students>>(`https://root-found-bn.onrender.com/v1/student/${id}`, data);
      const index = students.value.findIndex(student => student._id === id);
      if (index !== -1) {
        students.value[index] = { ...students.value[index], ...response.data.data };
      }
      const voice = new SpeechSynthesisUtterance(response.data.message)
      window.speechSynthesis.speak(voice)
      window.location.reload();
    } catch (error) {
      console.error('Failed to update student', error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://root-found-bn.onrender.com/v1/student/${id}`);
    students.value = students.value.filter(member => member._id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  return { students, fetchStudent, createStudent, updateStudent, deleteStudent };
});
