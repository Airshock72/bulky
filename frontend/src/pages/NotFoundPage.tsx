import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'

const NotFoundPage = () => (
  <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
    <h1 className='text-4xl font-bold'>404</h1>
    <p className='text-muted-foreground'>Page not found</p>
    <Link className='text-primary underline underline-offset-4' to={ROUTES.HOME}>
      Go home
    </Link>
  </main>
)

export default NotFoundPage
