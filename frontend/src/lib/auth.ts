export const AUTH_TOKEN_KEY = 'token'

export const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY)
