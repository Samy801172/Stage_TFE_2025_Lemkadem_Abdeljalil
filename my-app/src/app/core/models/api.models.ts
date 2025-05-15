import { User } from './user.model';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
} 