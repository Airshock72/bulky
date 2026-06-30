export const ROUTES = {
  HOME: '/',
  VILLAS: '/villas',
  VILLAS_CREATE: '/villas/create',
  VILLAS_UPDATE: '/villas/update/:id',
  VILLA_NUMBERS: '/villa-numbers',
  VILLA_NUMBERS_CREATE: '/villa-numbers/create',
  VILLA_NUMBERS_UPDATE: '/villa-numbers/update/:id'
} as const

export const buildVillaUpdateRoute = (id: number): string => `/villas/update/${id}`
export const buildVillaNumberUpdateRoute = (id: number): string => `/villa-numbers/update/${id}`
