import { useState, useRef, useEffect } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  minDate?: string
  placeholder?: string
  className?: string
}

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DatePicker = ({ value, onChange, minDate, placeholder = 'Select date', className }: DatePickerProps) => {
  const todayObj = new Date()
  todayObj.setHours(0, 0, 0, 0)

  const [isOpen, setIsOpen] = useState(false)
  const [viewYear, setViewYear] = useState(() =>
    value ? new Date(value + 'T00:00:00').getFullYear() : todayObj.getFullYear()
  )
  const [viewMonth, setViewMonth] = useState(() =>
    value ? new Date(value + 'T00:00:00').getMonth() : todayObj.getMonth()
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])

  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00')
      setViewYear(d.getFullYear())
      setViewMonth(d.getMonth())
    }
  }, [value])

  const selectedDate = value ? new Date(value + 'T00:00:00') : null
  const minDateObj = minDate ? new Date(minDate + 'T00:00:00') : null
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (day: number) => {
    const month = String(viewMonth + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    onChange?.(`${viewYear}-${month}-${dayStr}`)
    setIsOpen(false)
  }

  const isDayDisabled = (day: number) =>
    !!minDateObj && new Date(viewYear, viewMonth, day) < minDateObj

  const isDaySelected = (day: number) =>
    !!selectedDate &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day

  const isDayToday = (day: number) =>
    todayObj.getFullYear() === viewYear &&
    todayObj.getMonth() === viewMonth &&
    todayObj.getDate() === day

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type='button'
        onClick={() => setIsOpen(v => !v)}
        className={cn(
          'flex h-12 w-full items-center gap-3 rounded-xl border border-input bg-background px-4 text-sm shadow-sm',
          'transition-all duration-200 cursor-pointer',
          'hover:border-ring/50 hover:shadow',
          'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          !displayValue && 'text-muted-foreground'
        )}
      >
        <CalendarDays className='h-4 w-4 shrink-0 text-muted-foreground' />
        <span className='flex-1 text-left'>{displayValue || placeholder}</span>
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-2 z-50 w-72 rounded-xl border border-border bg-popover p-4 shadow-xl animate-fade-in-up'>
          <div className='flex items-center justify-between mb-4'>
            <button
              type='button'
              onClick={prevMonth}
              className='flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer'
            >
              <ChevronLeft className='h-4 w-4' />
            </button>
            <span className='text-sm font-semibold text-foreground select-none'>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type='button'
              onClick={nextMonth}
              className='flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer'
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>

          <div className='grid grid-cols-7 mb-1'>
            {WEEK_DAYS.map(d => (
              <div key={d} className='flex h-8 items-center justify-center text-xs font-medium text-muted-foreground select-none'>
                {d}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-y-0.5'>
            {Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`pad-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const disabled = isDayDisabled(day)
              const selected = isDaySelected(day)
              const today = isDayToday(day)
              return (
                <button
                  key={day}
                  type='button'
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    'flex h-8 w-full items-center justify-center rounded-lg text-sm transition-colors select-none',
                    selected && 'bg-emerald-600 text-white font-semibold hover:bg-emerald-700 cursor-pointer',
                    !selected && today && 'border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer',
                    !selected && !today && !disabled && 'hover:bg-accent text-foreground cursor-pointer',
                    disabled && 'text-muted-foreground/35 cursor-not-allowed'
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export { DatePicker }
