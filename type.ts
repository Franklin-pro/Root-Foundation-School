export interface CreateMemberData {
    email: string;
    username: string;
    course: string;
    password: string;
    role: string;
    image?: File | null; 
  }
  
  export interface CreateMember {
    data: CreateMemberData;
  }
  export interface MemberFormState {
    email: string;
    userName: string;
    course: string;
    password: string;
    role: string;
    memberImage: File | null;
  }
  export interface Message {
    _id:string;
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    campanyName: string;
    message: string;
  }
  
 export interface MessageFormState {
    fullName: string;
    email: string;
    phoneNumber: string;
    campanyName: string;
    message: string;
  }
  export interface ChatFormState {
    fullName: string;
    className: string;
    message: string;
  }
  export interface Chat {
    _id:string;
    id: string;
    fullName: string;
    className: string;
    message: string;
  }
  export interface Login {
    email: string;
    password: string;
    userName: string;
  }
  export interface UserInfo {
    email: string;
    userName: string;
    role: string;
    memberImage: string;
  }
  
  export interface User {
    id: string;
    email: string;
    username: string;
    role: string; 
  }
  export interface StudentFormState {
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport: File | null;
  }
  export interface createStudent {
    data: StudentFormState;
  }
  export interface Students {
    _id:string;
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport?: string; // Assuming image is a URL or similar
  }
export interface UpdateStudent{
  _id:string,
  id:string,
  firstName: string;
  lastName: string;
  age: string;
  sex: string;
  grade: string;
}

 // ~/type.ts

 export interface DropdownItem {
  label: string;
  icon: string;
  click: () => void;
}
export interface UpdateMember {
  _id: string;
  userName: string;
  email: string;
  course: string;
  role: string;
  memberImage?: File | string; 
}

export interface Member extends UpdateMember {
  id:string;
}

  export interface Member {
    _id:string;
    id: string;
    email: string;
    userName: string;
    course: string;
    role: string;
    url:string;
    memberImage?: string;
  }
  export interface BlogImage {
    url: string;
  }
  
  export interface Blogs {
    _id: string;
    id: string;
    blogName: string;
    blogDescription: string;
    blogStatus: string;
    url: string;
    blogImage?: BlogImage | undefined; // Optional BlogImage object
  }
  
  export interface BlogFormState {
    blogName: string;
    blogDescription: string;
    blogStatus: string;
    url: string;
    blogImage: File | null; // blogImage is for handling the file upload
  }
  
  export interface UpdateBlog {
    id: string;
    blogName: string;
    blogDescription: string;
    blogStatus: string;
    url:string;
    blogImage?: File | string; 
  }