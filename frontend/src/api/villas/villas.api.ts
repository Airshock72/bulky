import { apiDelete, apiGet, apiPost, apiPut } from '@/api/client'
import type { VillaFormData } from '@/schemas/villa'
import type { Villa } from './villas.types'

export const getVillas = (): Promise<Villa[]> =>
  apiGet<Villa[]>('/villa')

export const createVilla = (data: VillaFormData): Promise<void> =>
  apiPost<VillaFormData>('/villa', data)

export const updateVilla = (id: number, data: VillaFormData): Promise<void> =>
  apiPut<VillaFormData>(`/villa/${id}`, data)

export const deleteVilla = (id: number): Promise<void> =>
  apiDelete(`/villa/${id}`)
