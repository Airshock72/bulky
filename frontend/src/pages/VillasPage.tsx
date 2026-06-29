import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Villa {
  id: number
  name: string
  description: string
  price: number
  sqft: number
  occupancy: number
  imageUrl: string
  createdDate: string
  updatedDate: string
}

const VillasPage = () => {
  const [villas, setVillas] = useState<Array<Villa>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/villa`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Array<Villa>>
      })
      .then(data => setVillas(data))
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-6'>
        <Card className='w-full max-w-md text-center shadow-lg'>
          <CardContent className='py-10'>
            <p className='text-sm text-destructive'>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <section className='mx-auto max-w-4xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg hover:shadow-xl'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            Villas
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='flex items-center justify-end border-b border-border/50 px-6 py-3'>
            <Button variant='emerald' size='sm'>
              <Plus className='h-4 w-4' />
              Create New Villa
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className='border-0 hover:bg-transparent'>
                <TableHead className='pl-6'>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sqft</TableHead>
                <TableHead className='pr-6'>Occupancy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {villas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 text-center text-muted-foreground'
                  >
                    No villas found.
                  </TableCell>
                </TableRow>
              ) : (
                villas.map(villa => (
                  <TableRow key={villa.id}>
                    <TableCell className='pl-6 font-medium'>{villa.name}</TableCell>
                    <TableCell>${(villa.price ?? 0).toLocaleString()}/night</TableCell>
                    <TableCell>{(villa.sqft ?? 0).toLocaleString()} sqft</TableCell>
                    <TableCell className='pr-6'>{villa.occupancy} guests</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}

export default VillasPage
