import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role='radiogroup'
      aria-label='Color theme'
      className='relative flex h-8 w-17 items-center justify-between rounded-full border border-border bg-muted p-0.5'
    >
      <div
        aria-hidden='true'
        className={cn(
          'pointer-events-none absolute left-0.5 h-7 w-7 rounded-full bg-background shadow-sm transition-transform duration-300 ease-out',
          theme === 'dark' && 'translate-x-9'
        )}
      />

      <button
        type='button'
        role='radio'
        aria-checked={theme === 'light'}
        aria-label='Switch to light theme'
        onClick={() => setTheme('light')}
        className='relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center focus-visible:outline-none'
      >
        <Sun
          className={cn(
            'h-3.5 w-3.5 transition-colors duration-200',
            theme === 'light' ? 'text-foreground' : 'text-muted-foreground'
          )}
        />
      </button>

      <button
        type='button'
        role='radio'
        aria-checked={theme === 'dark'}
        aria-label='Switch to dark theme'
        onClick={() => setTheme('dark')}
        className='relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center focus-visible:outline-none'
      >
        <Moon
          className={cn(
            'h-3.5 w-3.5 transition-colors duration-200',
            theme === 'dark' ? 'text-foreground' : 'text-muted-foreground'
          )}
        />
      </button>
    </div>
  )
}

export default ThemeToggle
