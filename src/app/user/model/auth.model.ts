export interface RegisterData {
  id: number;
  firstname: string;
  lastname: string;
  dob: Date;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
}

export interface LoginData {
  email: string;
  password: string;
}
