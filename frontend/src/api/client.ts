import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from '@/lib/auth'

interface AuthTokensResponse {
  accessToken: string
  refreshToken: string
}

export const toAbsoluteUrl = (path: string): string => {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  const origin = new URL(import.meta.env.VITE_API_BASE_URL as string).origin
  return `${origin}${path}`
}

const parseErrorMessage = async (res: Response): Promise<string> => {
  const text = await res.text()
  if (text) {
    try {
      const body = JSON.parse(text)
      if (typeof body?.message === 'string') return body.message
      if (typeof body?.error === 'string') return body.error
      if (typeof body === 'string') return body
    } catch {
      return text
    }
  }
  return `Request failed: HTTP ${res.status}`
}

let refreshPromise: Promise<boolean> | null = null

const refreshAccessToken = (): Promise<boolean> => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      clearAuthTokens()
      return false
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Auth/Refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })

      if (!res.ok) {
        clearAuthTokens()
        return false
      }

      const tokens = await res.json() as AuthTokensResponse
      setAuthTokens(tokens.accessToken, tokens.refreshToken)
      return true
    } catch {
      clearAuthTokens()
      return false
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

const buildHeaders = (hasBody: boolean): HeadersInit => {
  const headers: Record<string, string> = {}
  if (hasBody) headers['Content-Type'] = 'application/json'

  const accessToken = getAccessToken()
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  return headers
}

const request = async (path: string, init: RequestInit, hasBody: boolean, allowRetry = true): Promise<Response> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(hasBody)
  })

  if (res.status === 401 && allowRetry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) return request(path, init, hasBody, false)
  }

  return res
}

export const apiGet = async <T>(path: string): Promise<T> => {
  const res = await request(path, { method: 'GET' }, false)
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  return await res.json() as Promise<T>
}

export const apiPost = async <TBody, TResponse = void>(path: string, body: TBody): Promise<TResponse> => {
  const res = await request(path, { method: 'POST', body: JSON.stringify(body) }, true)
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as TResponse
}

export const apiPut = async <TBody, TResponse = void>(path: string, body: TBody): Promise<TResponse> => {
  const res = await request(path, { method: 'PUT', body: JSON.stringify(body) }, true)
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as TResponse
}

export const apiDelete = async (path: string): Promise<void> => {
  const res = await request(path, { method: 'DELETE' }, false)
  if (!res.ok) throw new Error(await parseErrorMessage(res))
}
