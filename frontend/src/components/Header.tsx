import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'Villas', to: ROUTES.VILLAS },
] as const

const Header = () => (
  <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60'>
    <div className='mx-auto flex h-16 max-w-7xl items-center gap-8 px-6'>
      <Link
        to={ROUTES.HOME}
        className='rounded-sm text-xl font-bold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        BulkyWeb
      </Link>

      <nav className='flex items-center gap-6'>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'relative rounded-sm pb-0.5 text-sm font-medium transition-colors duration-200',
                'before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-left before:rounded-full before:bg-primary',
                'before:transition-transform before:duration-300 before:ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive
                  ? 'text-primary before:scale-x-100'
                  : 'text-muted-foreground before:scale-x-0 hover:text-foreground hover:before:scale-x-100'
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className='ml-auto'>
        <ThemeToggle />
      </div>
    </div>
  </header>
)

export default Header
