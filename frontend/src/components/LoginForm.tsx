import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { ROUTES } from '@/routes/routes'
import { loginSchema, type LoginFormData } from '@/schemas/login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false }
  })

  const onSubmit = (data: LoginFormData) => {
    console.info(data)
  }

  return (
    <Card className='w-full max-w-md overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      <CardHeader className='space-y-1.5 border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
        <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
          Login
        </CardTitle>
        <CardDescription className='text-center text-sm text-emerald-100/80'>
          Welcome back, sign in to continue
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

          <div className='space-y-1.5'>
            <Label htmlFor='password'>
              Password <span className='text-destructive'>*</span>
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                placeholder='Enter your password'
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

          <div className='flex items-center justify-between gap-4'>
            <label htmlFor='rememberMe' className='flex cursor-pointer items-center gap-2 select-none'>
              <Checkbox id='rememberMe' {...register('rememberMe')} />
              <span className='text-sm text-muted-foreground'>Remember me</span>
            </label>

            <button
              type='button'
              className='cursor-pointer text-sm font-medium text-emerald-700 underline underline-offset-4 transition-colors duration-200 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300'
            >
              Forgot password?
            </button>
          </div>

          <Button type='submit' variant='emerald' size='lg' className='w-full' disabled={isSubmitting}>
            <LogIn className='h-4 w-4' />
            Log In
          </Button>

          <div className='relative py-1 text-center'>
            <span className='relative z-10 bg-card px-3 text-xs uppercase tracking-wide text-muted-foreground'>
              or
            </span>
            <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border' />
          </div>

          <Button
            type='button'
            variant='outline'
            size='lg'
            className='w-full'
            onClick={() => navigate(ROUTES.REGISTER)}
          >
            Register New Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
