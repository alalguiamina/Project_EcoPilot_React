export type UserRole = "admin" | "agent" | "user";

export interface User {
  id: number;
  username: string;
  role: UserRole;
  sites: number[];
}

export interface CreateUserRequest {
  username: string;
  password: string;
  role: UserRole;
  sites: number[];
}

export interface UpdateUserRequest {
  username: string;
  role: UserRole;
  sites: number[];
}

export interface PartialUpdateUserRequest {
  username?: string;
  role?: UserRole;
  sites?: number[];
}

export interface ApiError {
  detail: string;
}

export interface ValidationError {
  [key: string]: string[];
}

export interface DeleteUserResponse {
  detail: string;
}
