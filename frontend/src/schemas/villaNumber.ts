import { z } from 'zod'

const emptyToUndefined = (val: string) => val === '' ? undefined : val

export const villaNumberSchema = z.object({
  villaId: z
    .string()
    .min(1, 'Please select a villa')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int().positive('Please select a valid villa')),
  number: z
    .string()
    .min(1, 'Villa number is required')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int('Must be a whole number').positive('Must be greater than 0')),
  specialDetails: z
    .string()
    .transform(emptyToUndefined)
    .pipe(z.string().max(500, 'Max 500 characters').optional())
})

export type VillaNumberFormInput = z.input<typeof villaNumberSchema>
export type VillaNumberFormData = z.infer<typeof villaNumberSchema>
