const parseErrorMessage = async (res: Response): Promise<string> => {
  try {
    const body = await res.json()
    if (typeof body?.message === 'string') return body.message
    if (typeof body?.error === 'string') return body.error
    if (typeof body === 'string') return body
  } catch {
    console.error('Failed to parse error message from response')
  }
  return `Request failed: HTTP ${res.status}`
}

export const apiGet = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`)
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  return await res.json() as Promise<T>
}

export const apiPost = async <TBody, TResponse = void>(path: string, body: TBody): Promise<TResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as TResponse
}

export const apiPut = async <TBody, TResponse = void>(path: string, body: TBody): Promise<TResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await parseErrorMessage(res))
  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as TResponse
}

export const apiDelete = async (path: string): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error(await parseErrorMessage(res))
}
