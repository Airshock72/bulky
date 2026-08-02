import { Button } from '@/components/ui/button'
import { toAbsoluteUrl } from '@/api/client'
import type { Villa } from '@/api/villas'

interface VillaCardProps {
  villa: Villa
}

const VillaCard = ({ villa }: VillaCardProps) => {
  const imageUrl = toAbsoluteUrl(villa.imageUrl)

  return (
    <div className='group flex min-h-64 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl'>
      <div className='relative w-110 shrink-0 transition-[width] duration-500 ease-out'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={villa.name}
            className='h-full w-full object-cover transition-transform duration-500'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-white'>
            <span className='text-sm font-medium text-gray-400'>No photo</span>
          </div>
        )}
        <div className='absolute top-0 left-0 h-full w-full bg-linear-to-t from-black/60 via-black/10 to-transparent' />
        <div className='absolute bottom-3 left-3 right-3'>
          <Button variant='emerald' size='sm' className='w-full rounded-lg'>
            Book
          </Button>
        </div>
      </div>

      <div className='flex flex-1 flex-col p-5'>
        <div className='mb-2.5 flex items-start justify-between gap-4'>
          <h3 className='text-xl font-bold leading-tight tracking-tight text-card-foreground'>
            {villa.name}
          </h3>
          <Button variant='emerald' size='sm' className='shrink-0 rounded-lg'>
            Details
          </Button>
        </div>

        <p className='mb-auto line-clamp-3 text-sm text-muted-foreground'>
          {villa.description}
        </p>

        <div className='mt-4 flex items-end justify-between border-t border-border pt-4'>
          <div className='space-y-0.5'>
            <p className='text-sm'>
              <span className='text-muted-foreground'>Max Occupancy: </span>
              <span className='font-semibold'>{villa.occupancy}</span>
            </p>
            <p className='text-sm'>
              <span className='text-muted-foreground'>Villa Size: </span>
              <span className='font-semibold'>{villa.sqft.toLocaleString()} sqft</span>
            </p>
          </div>

          <div className='text-right'>
            <p className='mb-0.5 text-xs text-muted-foreground'>per night</p>
            <p className='text-2xl font-bold leading-none tracking-tight'>
              <span className='text-sm font-medium text-muted-foreground'>USD </span>
              ${villa.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VillaCardSkeleton = () => (
  <div className='flex min-h-64 overflow-hidden rounded-2xl border border-border bg-card animate-pulse'>
    <div className='w-110 shrink-0 bg-muted' />
    <div className='flex flex-1 flex-col p-5 gap-3'>
      <div className='flex justify-between gap-4'>
        <div className='h-6 w-40 rounded-lg bg-muted' />
        <div className='h-8 w-20 rounded-lg bg-muted' />
      </div>
      <div className='h-4 w-full rounded bg-muted' />
      <div className='h-4 w-full rounded bg-muted' />
      <div className='h-4 w-3/4 rounded bg-muted' />
      <div className='mt-auto border-t border-border pt-4 flex justify-between items-end'>
        <div className='space-y-1.5'>
          <div className='h-4 w-36 rounded bg-muted' />
          <div className='h-4 w-32 rounded bg-muted' />
        </div>
        <div className='h-7 w-24 rounded bg-muted' />
      </div>
    </div>
  </div>
)

export default VillaCard
