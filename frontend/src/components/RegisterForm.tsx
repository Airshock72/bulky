import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { ROUTES } from '@/routes/routes'
import { registerSchema, type RegisterFormInput, type RegisterFormData } from '@/schemas/register'
import { registerUser } from '@/api/auth'
import { setAuthTokens } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const resolver = zodResolver(registerSchema) as unknown as Resolver<RegisterFormInput, unknown, RegisterFormData>

const RegisterForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormInput, unknown, RegisterFormData>({
    resolver,
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: ''
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const tokens = await registerUser(data)
      setAuthTokens(tokens.accessToken, tokens.refreshToken)
      toast.success('Registration successful! Please log in.')
      navigate(ROUTES.LOGIN)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  return (
    <Card className='w-full max-w-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      <CardHeader className='space-y-1.5 border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
        <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
          Register
        </CardTitle>
        <CardDescription className='text-center text-sm text-emerald-100/80'>
          Create an account to get started
        </CardDescription>
      </CardHeader>

      <CardContent className='p-6'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-5'>
          <div className='space-y-1.5'>
            <Label htmlFor='email'>
              Email <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              autoComplete='email'
              placeholder='you@example.com'
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='name'>
                Name <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='name'
                type='text'
                autoComplete='name'
                placeholder='John Doe'
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='phoneNumber'>
                Phone Number <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='phoneNumber'
                type='tel'
                maxLength={13}
                autoComplete='tel'
                placeholder='+1234567890'
                aria-invalid={!!errors.phoneNumber}
                {...register('phoneNumber')}
              />
              <FieldError message={errors.phoneNumber?.message} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='password'>
                Password <span className='text-destructive'>*</span>
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  placeholder='Enter password'
                  aria-invalid={!!errors.password}
                  className='pr-10'
                  {...register('password')}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none'
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='confirmPassword'>
                Confirm Password <span className='text-destructive'>*</span>
              </Label>
              <div className='relative'>
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  placeholder='Re-enter password'
                  aria-invalid={!!errors.confirmPassword}
                  className='pr-10'
                  {...register('confirmPassword')}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(v => !v)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  className='absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none'
                >
                  {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              </div>
              <FieldError message={errors.confirmPassword?.message} />
            </div>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='role'>
              Register As <span className='text-destructive'>*</span>
            </Label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id='role' aria-invalid={!!errors.role}>
                    <SelectValue placeholder='Please select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Customer'>Customer</SelectItem>
                    <SelectItem value='Admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.role?.message} />
          </div>

          <div className='h-px w-full bg-border' />

          <Button type='submit' variant='emerald' size='lg' className='w-full' disabled={isSubmitting}>
            <UserPlus className='h-4 w-4' />
            Register
          </Button>

          <p className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <button
              type='button'
              onClick={() => navigate(ROUTES.LOGIN)}
              className='cursor-pointer font-medium text-emerald-700 underline underline-offset-4 transition-colors duration-200 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300'
            >
              Log in
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
