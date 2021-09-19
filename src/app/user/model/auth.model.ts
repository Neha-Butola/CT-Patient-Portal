export interface RegisterData {
  userId: string;
  firstName: string;
  lastName: string;
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
