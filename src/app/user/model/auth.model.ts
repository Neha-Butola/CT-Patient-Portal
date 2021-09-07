export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
  dob: Date;
  phoneNo: number;
}

export interface LoginData {
  email: string;
  password: string;
}
