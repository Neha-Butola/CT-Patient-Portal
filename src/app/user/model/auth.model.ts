export interface RegisterData {
  firstname: string;
  lastname: string;
  dob: Date;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNo: number;
}

export interface LoginData {
  email: string;
  password: string;
}
