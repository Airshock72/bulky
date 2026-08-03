export type UserRole = 'Customer' | 'Admin'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface RegisterRequest {
  email: string
  name: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}
