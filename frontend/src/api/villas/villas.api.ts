import { apiGet, apiPost } from '@/api/client'
import type { VillaFormData } from '@/schemas/villa'
import type { Villa } from './villas.types'

export const getVillas = (): Promise<Villa[]> =>
  apiGet<Villa[]>('/villa')

export const createVilla = (data: VillaFormData): Promise<void> =>
  apiPost<VillaFormData>('/villa/create', data)
