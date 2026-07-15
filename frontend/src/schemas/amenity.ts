import { z } from 'zod'

const emptyToUndefined = (val: string) => val === '' ? undefined : val

export const amenitySchema = z.object({
  villaId: z
    .string()
    .min(1, 'Please select a villa')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int().positive('Please select a valid villa')),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Max 100 characters'),
  description: z
    .string()
    .transform(emptyToUndefined)
    .pipe(z.string().max(500, 'Max 500 characters').optional())
})

export type AmenityFormInput = z.input<typeof amenitySchema>
export type AmenityFormData = z.infer<typeof amenitySchema>
