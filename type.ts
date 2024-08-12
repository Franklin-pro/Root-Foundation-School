export interface Create {
    fullName:  string;
    password:string;
    email: string;
    phoneNumber:string;
    houseNumber:string;
    streetNumber:string;
    city:string;
    address:string;
    
}
export interface Login {
    // message:String;
    email:  string;
    password:string;
   
}

export interface User {
    id:        number;
    fullName:  string;
    email:     string;
    firstName: string;
    lastName:  string;
    gender:    string;
    image:     string;
    token:     string;
    role:String;
    user:any;
    message:String;
    data:any,
    password:string;
    phoneNumber:string;
    houseNumber:string;
    streetNumber:string;
    city:string;
    address:string;
}