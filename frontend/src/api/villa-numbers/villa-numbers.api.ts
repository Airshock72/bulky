import { apiDelete, apiGet, apiPost, apiPut } from '../client'
import type { VillaNumber } from './villa-numbers.types'
import type { VillaNumberFormData } from '@/schemas/villaNumber'

export const getVillaNumbers = (): Promise<VillaNumber[]> =>
  apiGet<VillaNumber[]>('/villaNumber')

export const createVillaNumber = (data: VillaNumberFormData): Promise<void> =>
  apiPost<VillaNumberFormData>('/villaNumber', data)

export const updateVillaNumber = (id: number, data: VillaNumberFormData): Promise<void> =>
  apiPut<VillaNumberFormData>(`/villaNumber/${id}`, data)

export const deleteVillaNumber = (id: number): Promise<void> =>
  apiDelete(`/villaNumber/${id}`)
