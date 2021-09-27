export interface RegisterData {
  id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  role: string;
  profile?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
}

export interface LoginData {
  email: string;
  password: string;
}
