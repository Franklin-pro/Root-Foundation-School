export interface CreateMemberData {
    email: string;
    username: string;
    course: string;
    password: string;
    role: string;
    image?: File | null; // Optional field for file upload
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
  memberImage?: File | string; // Adjust this based on how the image is handled
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
    memberImage?: string; // Assuming image is a URL or similar
  }
  