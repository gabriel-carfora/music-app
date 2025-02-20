export interface AuthResponse {
    type: 'success' | 'error';
    params: {
      access_token: string;
      [key: string]: string;
    };
  }

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
export interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  