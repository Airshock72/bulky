import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.email('Please enter a valid email address').min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or fewer'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .max(13, 'Phone number must be at most 13 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.string().min(1, 'Please select a role').pipe(z.enum(['Customer', 'Admin']))
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type RegisterFormInput = z.input<typeof registerSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
