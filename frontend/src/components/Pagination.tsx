import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

type PageItem = number | '...'

const PER_PAGE_OPTIONS = [5, 10, 20, 50] as const

const getPageItems = (current: number, total: number): PageItem[] => {
  const t = Math.max(1, total)
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, '...', t]
  if (current >= t - 2) return [1, '...', t - 3, t - 2, t - 1, t]
  return [1, '...', current - 1, current, current + 1, '...', t]
}

const Pagination = ({ currentPage, totalPages, perPage, onPageChange, onPerPageChange }: PaginationProps) => {
  const hasNoItems = totalPages === 0
  const effectiveTotal = Math.max(1, totalPages)
  const pageItems = getPageItems(currentPage, effectiveTotal)

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <span className='select-none'>Rows per page</span>
        <div className='relative'>
          <select
            value={perPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
            className='h-8 cursor-pointer appearance-none rounded-md border border-input bg-background pl-2 pr-7 py-0 text-sm text-foreground'
          >
            {PER_PAGE_OPTIONS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronDown className='pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground' />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || hasNoItems}
          aria-label='Previous page'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center gap-1'>
          {pageItems.map((item, i) =>
            item === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className='flex h-8 w-8 items-center justify-center select-none text-sm text-muted-foreground'
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                variant={item === currentPage && !hasNoItems ? 'default' : 'ghost'}
                className={cn(
                  'h-8 min-w-8 px-2.5 text-sm',
                  item === currentPage && !hasNoItems
                    ? 'font-semibold'
                    : 'text-foreground'
                )}
                onClick={() => onPageChange(item)}
                disabled={hasNoItems}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </Button>
            )
          )}
        </div>

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= effectiveTotal || hasNoItems}
          aria-label='Next page'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
