import { useEffect, useState } from 'react'
import { getVilla } from '@/api/villas'
import { toAbsoluteUrl } from '@/api/client'
import type { Villa } from '@/api/villas'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogXClose
} from '@/components/ui/dialog'

interface VillaDetailsModalProps {
  villaId: number
  open: boolean
  onClose: () => void
}

const VillaDetailsModal = ({ villaId, open, onClose }: VillaDetailsModalProps) => {
  const [villa, setVilla] = useState<Villa | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setError(null)
    setVilla(null)
    getVilla(villaId)
      .then(setVilla)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [open, villaId])

  const imageUrl = villa ? toAbsoluteUrl(villa.imageUrl) : null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Villa Details</DialogTitle>
          <DialogXClose />
        </DialogHeader>

        <DialogBody>
          {error ? (
            <p className='text-sm text-destructive'>{error}</p>
          ) : (
            <div className='flex flex-col gap-6 md:flex-row'>
              {loading ? (
                <div className='h-72 w-full shrink-0 animate-pulse rounded-xl bg-muted md:h-auto md:w-80' />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={villa?.name}
                  className='h-72 w-full shrink-0 rounded-xl object-cover md:h-auto md:w-80'
                />
              ) : (
                <div className='flex h-72 w-full shrink-0 items-center justify-center rounded-xl bg-muted md:h-auto md:w-80'>
                  <span className='text-sm text-muted-foreground'>No photo</span>
                </div>
              )}
              <div className='flex flex-1 flex-col gap-4'>
                {loading ? (
                  <div className='h-7 w-48 animate-pulse rounded-lg bg-muted' />
                ) : (
                  <h3 className='text-xl font-bold text-amber-500'>{villa?.name}</h3>
                )}

                {loading ? (
                  <div className='space-y-2'>
                    <div className='h-4 w-full animate-pulse rounded bg-muted' />
                    <div className='h-4 w-full animate-pulse rounded bg-muted' />
                    <div className='h-4 w-3/4 animate-pulse rounded bg-muted' />
                  </div>
                ) : (
                  <p className='text-sm text-muted-foreground'>{villa?.description}</p>
                )}
                <div>
                  {loading ? (
                    <div className='space-y-2'>
                      <div className='h-4 w-32 animate-pulse rounded bg-muted' />
                      <div className='h-3.5 w-24 animate-pulse rounded bg-muted' />
                      <div className='h-3.5 w-28 animate-pulse rounded bg-muted' />
                    </div>
                  ) : (
                    <>
                      <p className='mb-2 text-sm font-semibold text-foreground'>Villa Amenities</p>
                      {villa?.amenities && villa.amenities.length > 0 ? (
                        <ul className='space-y-1'>
                          {villa.amenities.map((amenity) => (
                            <li key={amenity.id} className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500' />
                              {amenity.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className='text-sm text-muted-foreground italic'>This villa has no amenities listed.</p>
                      )}
                    </>
                  )}
                </div>

                <div className='mt-auto space-y-2 border-t border-border pt-4 text-right'>
                  {loading ? (
                    <div className='flex flex-col items-end gap-2'>
                      <div className='h-4 w-40 animate-pulse rounded bg-muted' />
                      <div className='h-4 w-36 animate-pulse rounded bg-muted' />
                      <div className='h-6 w-36 animate-pulse rounded bg-muted' />
                    </div>
                  ) : (
                    <>
                      <p className='text-sm text-muted-foreground'>
                        Max Occupancy:{' '}
                        <span className='font-semibold text-foreground'>
                          {villa?.occupancy} {villa?.occupancy === 1 ? 'adult' : 'adults'}
                        </span>
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Villa Size:{' '}
                        <span className='font-semibold text-foreground'>
                          {villa?.sqft.toLocaleString()} sqft
                        </span>
                      </p>
                      <p className='text-base font-bold text-foreground'>
                        <span className='text-sm font-medium text-muted-foreground'>USD </span>
                        ${villa?.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                        <span className='text-sm font-normal text-muted-foreground'>/ night</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button variant='destructive' onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default VillaDetailsModal
