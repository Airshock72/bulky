import { apiDelete, apiGet, apiPost, apiPut } from '../client'
import type { Amenity } from './amenities.types'
import type { AmenityFormData } from '@/schemas/amenity'

export const getAmenities = (): Promise<Amenity[]> =>
  apiGet<Amenity[]>('/amenity')

export const createAmenity = (data: AmenityFormData): Promise<void> =>
  apiPost<AmenityFormData>('/amenity', data)

export const updateAmenity = (id: number, data: AmenityFormData): Promise<void> =>
  apiPut<AmenityFormData>(`/amenity/${id}`, data)

export const deleteAmenity = (id: number): Promise<void> =>
  apiDelete(`/amenity/${id}`)
