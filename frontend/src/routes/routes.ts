export const ROUTES = {
  HOME: '/',
  VILLAS: '/villas',
  VILLAS_CREATE: '/villas/create',
  VILLAS_UPDATE: '/villas/update/:id'
} as const

export const buildVillaUpdateRoute = (id: number): string => `/villas/update/${id}`
