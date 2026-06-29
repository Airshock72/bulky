import { cn } from '@/lib/utils'
import { forwardRef, TextareaHTMLAttributes } from 'react'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
        'ring-offset-background placeholder:text-muted-foreground',
        'transition-all duration-200 resize-none',
        'hover:border-ring/50 hover:shadow',
        'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
