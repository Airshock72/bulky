import { apiPost } from '../client'
import type { AuthTokens, LoginRequest, RegisterRequest } from './auth.types'

export const registerUser = (data: RegisterRequest): Promise<AuthTokens> =>
  apiPost<RegisterRequest, AuthTokens>('/Auth/Register', data)

export const loginUser = (data: LoginRequest): Promise<AuthTokens> =>
  apiPost<LoginRequest, AuthTokens>('/Auth/Login', data)
