import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { ROUTES, buildVillaUpdateRoute } from '@/routes/routes'
import { getVillas } from '@/api/villas'
import type { Villa } from '@/api/villas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const VillasPage = () => {
  const navigate = useNavigate()
  const [villas, setVillas] = useState<Villa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getVillas()
      .then(data => setVillas(data))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
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
            <Button variant='emerald' size='sm' onClick={() => navigate(ROUTES.VILLAS_CREATE)}>
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
                <TableHead>Occupancy</TableHead>
                <TableHead className='pr-6 text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {villas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
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
                    <TableCell>{villa.occupancy} guests</TableCell>
                    <TableCell className='pr-6'>
                      <div className='flex items-center justify-end gap-2'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant='emerald'
                              size='sm'
                              onClick={() => navigate(buildVillaUpdateRoute(villa.id), { state: villa })}
                            >
                              <Pencil className='h-4 w-4' />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='destructive' size='sm'>
                              <Trash2 className='h-4 w-4' />
                              Delete
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
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
