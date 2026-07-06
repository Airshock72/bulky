import { useRef, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DragEvent, ChangeEvent, KeyboardEvent } from 'react'
import { UploadCloud, X, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  id?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

const ImageUpload = ({ id, value, onChange, className, 'aria-invalid': ariaInvalid }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isBackendImage = !!value && value.startsWith('http')

  useEffect(() => {
    if (!isLightboxOpen) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  const readFile = useCallback((file: File) => {
    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      setIsLoading(false)
      onChange?.(e.target?.result as string)
    }
    reader.onerror = () => setIsLoading(false)
    reader.readAsDataURL(file)
  }, [onChange])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) readFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file?.type.startsWith('image/')) readFile(file)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputRef.current?.click()
    }
  }

  const isInvalid = ariaInvalid === true || ariaInvalid === 'true'

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        id={id}
        type='file'
        accept='image/*'
        className='sr-only'
        onChange={handleFileChange}
      />

      {value ? (
        <div className='group relative overflow-hidden rounded-lg border border-border shadow-sm'>
          <img
            src={value}
            alt='Preview'
            className='h-52 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
          <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100'>
            {isBackendImage && (
              <button
                type='button'
                aria-label='View full image'
                onClick={() => setIsLightboxOpen(true)}
                className='rounded-md bg-white/90 p-2 text-gray-900 shadow transition-transform duration-150 hover:scale-105 hover:bg-white'
              >
                <Eye className='h-4 w-4' />
              </button>
            )}
            <button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='rounded-md bg-white/90 px-4 py-1.5 text-sm font-medium text-gray-900 shadow transition-transform duration-150 hover:scale-105 hover:bg-white'
            >
              Change image
            </button>
          </div>
          <button
            type='button'
            aria-label='Remove image'
            onClick={() => onChange?.('')}
            className='absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground shadow-md transition-all duration-150 hover:scale-110 hover:shadow-lg'
          >
            <X className='h-3.5 w-3.5' />
          </button>
        </div>
      ) : (
        <div
          role='button'
          tabIndex={0}
          aria-label='Upload image'
          aria-invalid={ariaInvalid}
          onClick={() => inputRef.current?.click()}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDragEnd={() => setIsDragging(false)}
          className={cn(
            'flex h-44 w-full cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-lg',
            'border-2 border-dashed outline-none transition-all duration-200',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isDragging
              ? 'border-emerald-500 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
              : isInvalid
                ? 'border-destructive text-muted-foreground hover:border-destructive/70 hover:bg-destructive/5'
                : 'border-input text-muted-foreground hover:border-ring/60 hover:bg-muted/40'
          )}
        >
          {isLoading ? (
            <div className='flex flex-col items-center gap-2.5'>
              <div className='h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-emerald-500' />
              <p className='text-sm'>Processing…</p>
            </div>
          ) : (
            <>
              <div className={cn(
                'rounded-full p-3 transition-all duration-200',
                isDragging ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-muted'
              )}>
                <UploadCloud className={cn(
                  'h-6 w-6 transition-all duration-200',
                  isDragging && 'scale-110'
                )} />
              </div>
              <div className='text-center'>
                <p className='text-sm'>
                  <span className='font-semibold text-foreground'>Click to upload</span>
                  {' '}or drag & drop
                </p>
                <p className='mt-0.5 text-xs opacity-70'>PNG, JPG, WebP, GIF</p>
              </div>
            </>
          )}
        </div>
      )}

      {isLightboxOpen && createPortal(
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm'
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type='button'
            aria-label='Close'
            onClick={() => setIsLightboxOpen(false)}
            className='absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25'
          >
            <X className='h-5 w-5' />
          </button>
          <img
            src={value}
            alt='Full size preview'
            className='max-h-full max-w-full rounded-lg object-contain shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </div>
  )
}

export { ImageUpload }
export type { ImageUploadProps }
