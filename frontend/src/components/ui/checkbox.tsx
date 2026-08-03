import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'
import { Check } from 'lucide-react'

const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <span className={cn('relative inline-flex size-4 shrink-0', className)}>
      <input
        type='checkbox'
        ref={ref}
        className={cn(
          'peer size-4 cursor-pointer appearance-none rounded-sm border border-input bg-background shadow-sm',
          'transition-all duration-200 hover:border-ring/50',
          'checked:border-emerald-600 checked:bg-emerald-600',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        {...props}
      />
      <Check
        strokeWidth={3}
        className='pointer-events-none absolute inset-0 size-4 scale-50 p-0.75 text-white opacity-0 transition-all duration-150 ease-out peer-checked:scale-100 peer-checked:opacity-100'
      />
    </span>
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
