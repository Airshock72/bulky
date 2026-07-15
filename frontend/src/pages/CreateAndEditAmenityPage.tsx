import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { ROUTES } from '@/routes/routes'
import { getVillasList } from '@/api/villas'
import type { VillaListItem } from '@/api/villas'
import { createAmenity, updateAmenity } from '@/api/amenities'
import type { Amenity } from '@/api/amenities'
import { amenitySchema, type AmenityFormInput, type AmenityFormData } from '@/schemas/amenity'
import NotFoundPage from '@/pages/NotFoundPage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const resolver = zodResolver(amenitySchema) as unknown as Resolver<AmenityFormInput, unknown, AmenityFormData>

const CreateAndEditAmenityPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { state } = useLocation()
  const amenity = state as Amenity | undefined
  const isEditMode = !!id

  const [villas, setVillas] = useState<VillaListItem[]>([])

  useEffect(() => {
    getVillasList().then(setVillas).catch(() => console.error('Failed to fetch villas'))
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<AmenityFormInput, unknown, AmenityFormData>({
    resolver,
    defaultValues: amenity ? {
      villaId: String(amenity.villaId),
      name: amenity.name,
      description: amenity.description ?? ''
    } : {
      villaId: ''
    }
  })

  const onSubmit = async (data: AmenityFormData) => {
    try {
      if (isEditMode) {
        await updateAmenity(Number(id), data)
        toast.success('Amenity updated successfully!')
      } else {
        await createAmenity(data)
        toast.success('Amenity created successfully!')
      }
      navigate(ROUTES.AMENITIES)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  if (isEditMode && !amenity) return <NotFoundPage />

  return (
    <section className='mx-auto max-w-3xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            {isEditMode ? 'Update Amenity' : 'Create Amenity'}
          </CardTitle>
        </CardHeader>

        <CardContent className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-5'>

            <div className='space-y-1.5'>
              <Label htmlFor='villaId'>
                Villa <span className='text-destructive'>*</span>
              </Label>
              <Controller
                name='villaId'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id='villaId' aria-invalid={!!errors.villaId}>
                      <SelectValue placeholder='Please select a villa' />
                    </SelectTrigger>
                    <SelectContent>
                      {villas.map(v => (
                        <SelectItem key={v.id} value={String(v.id)}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.villaId?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='name'>
                Amenity Name <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='e.g. Swimming Pool'
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Any additional details about this amenity…'
                aria-invalid={!!errors.description}
                {...register('description')}
              />
              <FieldError message={errors.description?.message} />
            </div>

            <div className='flex items-center justify-end gap-3 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(ROUTES.AMENITIES)}
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

export default CreateAndEditAmenityPage
