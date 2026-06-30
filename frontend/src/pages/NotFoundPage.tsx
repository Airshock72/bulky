import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { ROUTES } from '@/routes/routes'
import { Button } from '@/components/ui/button'
import NotFoundIllustration from '@/assets/images/NotFoundIllustration'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-6 py-16 text-center animate-fade-in-up'>

      <NotFoundIllustration />

      <div className='space-y-1'>
        <h1 className='text-[7rem] font-black leading-none tracking-tight bg-linear-to-br from-emerald-600 via-emerald-500 to-emerald-300 bg-clip-text text-transparent'>
          404
        </h1>
      </div>

      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold tracking-tight text-foreground'>
          Houston, we have a problem
        </h2>
        <p className='mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground'>
          Looks like you're lost in space. The page you're looking for doesn't exist or has drifted off into the void.
        </p>
      </div>

      <Button variant='emerald' size='lg' onClick={() => navigate(ROUTES.HOME)}>
        <Home className='h-4 w-4' />
        Back to Home
      </Button>

    </div>
  )
}

export default NotFoundPage
