import { Card, CardContent } from '@/components/ui/card'

interface PageErrorProps {
  message: string
}

const PageError = ({ message }: PageErrorProps) => (
  <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-6'>
    <Card className='w-full max-w-md text-center shadow-lg'>
      <CardContent className='py-10'>
        <p className='text-sm text-destructive'>{message}</p>
      </CardContent>
    </Card>
  </div>
)

export default PageError
