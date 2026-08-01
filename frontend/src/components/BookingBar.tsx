import { Search, CalendarDays, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { NIGHTS_OPTIONS } from '@/hooks/useHomePage'

interface BookingBarProps {
  checkIn: string
  setCheckIn: (v: string) => void
  nights: string
  setNights: (v: string) => void
  today: string
  isButtonDisabled: boolean
  onCheckAvailability: () => void
}

const BookingBar = ({
  checkIn,
  setCheckIn,
  nights,
  setNights,
  today,
  isButtonDisabled,
  onCheckAvailability
}: BookingBarProps) => (
  <div className='border-b border-border bg-background shadow-sm'>
    <div className='mx-auto max-w-4xl px-6 py-6'>
      <div className='flex flex-col items-stretch gap-4 sm:flex-row sm:items-end'>
        <div className='flex-1'>
          <Label className='mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            <CalendarDays className='h-3.5 w-3.5' />
            Check in Date
          </Label>
          <DatePicker
            value={checkIn}
            onChange={setCheckIn}
            minDate={today}
            placeholder='Select date'
          />
        </div>

        <div className='flex-1'>
          <Label className='mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            <Moon className='h-3.5 w-3.5' />
            No. of Nights
          </Label>
          <Select value={nights} onValueChange={setNights}>
            <SelectTrigger className='h-12 rounded-xl text-sm'>
              <SelectValue placeholder='Select nights' />
            </SelectTrigger>
            <SelectContent>
              {NIGHTS_OPTIONS.map(n => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? 'night' : 'nights'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            variant='emerald'
            onClick={onCheckAvailability}
            disabled={isButtonDisabled}
            className='h-12 w-full gap-2 rounded-xl px-6 sm:w-auto'
          >
            <Search className='h-4 w-4' />
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default BookingBar
