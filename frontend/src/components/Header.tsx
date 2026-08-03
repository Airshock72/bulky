import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Building2, ChevronDown, Hash, LogIn, Sparkles } from 'lucide-react'
import { ROUTES } from '@/routes/routes'
import { cn } from '@/lib/utils'
import { getAuthToken } from '@/lib/auth'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import BulkyWebLogo from '@/assets/images/BulkyWebLogo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const VILLA_LINKS = [
  { label: 'Villas', to: ROUTES.VILLAS, icon: Building2 },
  { label: 'Villa Numbers', to: ROUTES.VILLA_NUMBERS, icon: Hash }
] as const

const AMENITY_LINK = { label: 'Amenities', to: ROUTES.AMENITIES, icon: Sparkles } as const

const CONTENT_MANAGEMENT_LINKS = [...VILLA_LINKS, AMENITY_LINK]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isContentManagementActive = CONTENT_MANAGEMENT_LINKS.some(l => location.pathname.startsWith(l.to))

  const handleSignInClick = () => {
    if (!getAuthToken()) {
      navigate(ROUTES.LOGIN)
    }
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-backdrop-filter:bg-white/65 dark:supports-backdrop-filter:bg-slate-950/65'>
      <div className='mx-auto flex h-16 max-w-7xl items-center gap-8 px-6'>
        <Link
          to={ROUTES.HOME}
          className='flex items-center gap-2 rounded-sm transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <BulkyWebLogo />
          <span className='text-xl font-bold tracking-tight text-foreground'>BulkyWeb</span>
        </Link>

        <nav className='flex items-center gap-6'>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'group relative flex cursor-pointer items-center gap-1.5 rounded-sm pb-0.5 text-sm font-medium outline-none transition-colors duration-200',
                'before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-left before:rounded-full before:bg-primary',
                'before:transition-transform before:duration-300 before:ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isContentManagementActive
                  ? 'text-primary before:scale-x-100'
                  : 'text-muted-foreground before:scale-x-0 hover:text-foreground hover:before:scale-x-100'
              )}
            >
              Content Management
              <ChevronDown className='h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuGroup>
                {VILLA_LINKS.map(({ label, to, icon: Icon }) => (
                  <DropdownMenuItem key={to} asChild>
                    <Link
                      to={to}
                      className={cn(location.pathname.startsWith(to) && 'bg-accent/60 text-accent-foreground')}
                    >
                      <Icon className='h-4 w-4 text-emerald-600' />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to={AMENITY_LINK.to}
                  className={cn(location.pathname.startsWith(AMENITY_LINK.to) && 'bg-accent/60 text-accent-foreground')}
                >
                  <Sparkles className='h-4 w-4 text-emerald-600' />
                  {AMENITY_LINK.label}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className='ml-auto flex items-center gap-3'>
          <ThemeToggle />
          <Button variant='emerald' size='sm' onClick={handleSignInClick}>
            <LogIn className='h-4 w-4' />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
