import { z } from 'zod'

const emptyToUndefined = (val: string) => val === '' ? undefined : val

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
    .transform(emptyToUndefined)
    .pipe(z.string().max(500, 'Description must be 500 characters or fewer').optional()),
  price: positiveNumber(),
  sqft: positiveNumber(),
  occupancy: positiveNumber(true),
  imageUrl: z
    .string()
    .transform(emptyToUndefined)
    .pipe(z.url({ message: 'Must be a valid URL' }).optional())
})

export type VillaFormInput = z.input<typeof villaSchema>
export type VillaFormData = z.infer<typeof villaSchema>
