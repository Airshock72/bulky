export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VILLAS: '/villas',
  VILLAS_CREATE: '/villas/create',
  VILLAS_UPDATE: '/villas/update/:id',
  VILLA_NUMBERS: '/villa-numbers',
  VILLA_NUMBERS_CREATE: '/villa-numbers/create',
  VILLA_NUMBERS_UPDATE: '/villa-numbers/update/:id',
  AMENITIES: '/amenities',
  AMENITIES_CREATE: '/amenities/create',
  AMENITIES_UPDATE: '/amenities/update/:id'
} as const

export const buildVillaUpdateRoute = (id: number): string => `/villas/update/${id}`
export const buildVillaNumberUpdateRoute = (id: number): string => `/villa-numbers/update/${id}`
export const buildAmenityUpdateRoute = (id: number): string => `/amenities/update/${id}`
