import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { ROUTES } from '@/routes/routes'
import { getVillas } from '@/api/villas'
import type { Villa } from '@/api/villas'
import { createVillaNumber, updateVillaNumber } from '@/api/villa-numbers'
import type { VillaNumber } from '@/api/villa-numbers'
import { villaNumberSchema, type VillaNumberFormInput, type VillaNumberFormData } from '@/schemas/villaNumber'
import NotFoundPage from '@/pages/NotFoundPage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const resolver = zodResolver(villaNumberSchema) as unknown as Resolver<VillaNumberFormInput, unknown, VillaNumberFormData>

const CreateAndEditVillaNumberPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { state } = useLocation()
  const villaNumber = state as VillaNumber | undefined
  const isEditMode = !!id

  const [villas, setVillas] = useState<Villa[]>([])

  useEffect(() => {
    getVillas().then(setVillas).catch(() => console.error('Failed to fetch villas'))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<VillaNumberFormInput, unknown, VillaNumberFormData>({
    resolver,
    ...(villaNumber ? {
      defaultValues: {
        villaId: String(villaNumber.villaId),
        number: String(villaNumber.number),
        specialDetails: villaNumber.specialDetails ?? ''
      }
    } : {})
  })

  const onSubmit = async (data: VillaNumberFormData) => {
    try {
      if (isEditMode) {
        await updateVillaNumber(Number(id), data)
        toast.success('Villa Number updated successfully!')
      } else {
        await createVillaNumber(data)
        toast.success('Villa Number created successfully!')
      }
      navigate(ROUTES.VILLA_NUMBERS)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  if (isEditMode && !villaNumber) return <NotFoundPage />

  return (
    <section className='mx-auto max-w-3xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            {isEditMode ? 'Update Villa Number' : 'Create Villa Number'}
          </CardTitle>
        </CardHeader>

        <CardContent className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-5'>

            <div className='space-y-1.5'>
              <Label htmlFor='villaId'>
                Villa <span className='text-destructive'>*</span>
              </Label>
              <div className='relative'>
                <select
                  id='villaId'
                  className={cn(
                    'flex h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 py-1 text-sm shadow-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  aria-invalid={!!errors.villaId}
                  {...register('villaId')}
                >
                  <option value=''>Select a villa…</option>
                  {villas.map(v => (
                    <option key={v.id} value={String(v.id)}>{v.name}</option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              </div>
              <FieldError message={errors.villaId?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='number'>
                Villa Number <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='number'
                type='number'
                min='1'
                step='1'
                placeholder='e.g. 101'
                aria-invalid={!!errors.number}
                {...register('number')}
              />
              <FieldError message={errors.number?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='specialDetails'>Special Details</Label>
              <Textarea
                id='specialDetails'
                placeholder='Any special notes about this villa number…'
                aria-invalid={!!errors.specialDetails}
                {...register('specialDetails')}
              />
              <FieldError message={errors.specialDetails?.message} />
            </div>

            <div className='flex items-center justify-end gap-3 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(ROUTES.VILLA_NUMBERS)}
              >
                Return to list
              </Button>
              <Button type='submit' variant='emerald' disabled={isSubmitting}>
                {isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
                {isSubmitting
                  ? (isEditMode ? 'Updating…' : 'Creating…')
                  : (isEditMode ? 'Update' : 'Create')
                }
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default CreateAndEditVillaNumberPage
