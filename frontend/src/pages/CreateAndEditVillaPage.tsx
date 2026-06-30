import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { ROUTES } from '@/routes/routes'
import { createVilla, updateVilla } from '@/api/villas'
import type { Villa } from '@/api/villas'
import { villaSchema, type VillaFormInput, type VillaFormData } from '@/schemas/villa'
import NotFoundPage from '@/pages/NotFoundPage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const resolver = zodResolver(villaSchema) as unknown as Resolver<VillaFormInput, unknown, VillaFormData>

const CreateAndEditVillaPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { state } = useLocation()
  const villa = state as Villa | undefined
  const isEditMode = !!id

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<VillaFormInput, unknown, VillaFormData>({
    resolver,
    ...(villa ? {
      defaultValues: {
        name: villa.name ?? '',
        description: villa.description ?? '',
        price: villa.price != null ? String(villa.price) : '',
        sqft: villa.sqft != null ? String(villa.sqft) : '',
        occupancy: villa.occupancy != null ? String(villa.occupancy) : '',
        imageUrl: villa.imageUrl ?? ''
      }
    } : {})
  })

  const onSubmit = async (data: VillaFormData) => {
    try {
      if (isEditMode) {
        await updateVilla(Number(id), data)
        toast.success('Villa updated successfully!')
      } else {
        await createVilla(data)
        toast.success('Villa created successfully!')
      }
      navigate(ROUTES.VILLAS)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  if (isEditMode && !villa) return <NotFoundPage />

  return (
    <section className='mx-auto max-w-3xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            {isEditMode ? 'Update Villa' : 'Create Villa'}
          </CardTitle>
        </CardHeader>

        <CardContent className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-5'>

            <div className='space-y-1.5'>
              <Label htmlFor='name'>
                Name <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='name'
                placeholder='Enter villa name'
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Describe the villa…'
                aria-invalid={!!errors.description}
                {...register('description')}
              />
              <FieldError message={errors.description?.message} />
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='space-y-1.5'>
                <Label htmlFor='price'>Price ($/night)</Label>
                <Input
                  id='price'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='0.00'
                  aria-invalid={!!errors.price}
                  {...register('price')}
                />
                <FieldError message={errors.price?.message} />
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='sqft'>Size (sqft)</Label>
                <Input
                  id='sqft'
                  type='number'
                  min='0'
                  placeholder='0'
                  aria-invalid={!!errors.sqft}
                  {...register('sqft')}
                />
                <FieldError message={errors.sqft?.message} />
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='occupancy'>Occupancy (guests)</Label>
                <Input
                  id='occupancy'
                  type='number'
                  min='1'
                  step='1'
                  placeholder='0'
                  aria-invalid={!!errors.occupancy}
                  {...register('occupancy')}
                />
                <FieldError message={errors.occupancy?.message} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='imageUrl'>Image URL</Label>
              <Input
                id='imageUrl'
                type='url'
                placeholder='https://example.com/image.jpg'
                aria-invalid={!!errors.imageUrl}
                {...register('imageUrl')}
              />
              <FieldError message={errors.imageUrl?.message} />
            </div>

            <div className='flex items-center justify-end gap-3 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(ROUTES.VILLAS)}
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

export default CreateAndEditVillaPage
