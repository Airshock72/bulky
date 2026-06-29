import { z } from 'zod'

const positiveNumber = (integer = false) =>
  z
    .string()
    .transform(val => {
      if (val === '') return undefined
      const n = integer ? parseInt(val, 10) : parseFloat(val)
      return isNaN(n) ? undefined : n
    })
    .pipe(
      (integer
        ? z.number().int('Must be a whole number').positive('Must be greater than 0')
        : z.number().positive('Must be greater than 0')
      ).optional()
    )

export const villaSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or fewer'),
  price: positiveNumber(),
  sqft: positiveNumber(),
  occupancy: positiveNumber(true),
  imageUrl: z.union([z.literal(''), z.string().url('Must be a valid URL')])
})

export type VillaFormInput = z.input<typeof villaSchema>
export type VillaFormData = z.infer<typeof villaSchema>
