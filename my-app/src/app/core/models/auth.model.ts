import { UserRole } from './user.model';

export interface SignInPayload {
  username: string;
  password: string;
  socialLogin?: boolean;
  googleHash?: string;
  facebookHash?: string;
}

export interface AuthResponse {
  data: {
    token: string;
    refreshToken: string;
    token_id: string;
    credential?: {
      id: string;
      username: string;
      isAdmin: boolean;
      mail: string;
    };
  };
}

export interface SignupPayload {
  username: string;
  mail: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  companySector?: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  username: string;
  password: string;
} 