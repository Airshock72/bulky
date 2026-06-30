import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useVillasPage } from '@/hooks/useVillasPage'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import DeleteVillaDialog from '@/components/DeleteVillaDialog'
import Pagination from '@/components/Pagination'
import PageLoader from '@/pages/PageLoader'
import PageError from '@/pages/PageError'

const VillasPage = () => {
  const {
    loading,
    error,
    currentPage,
    perPage,
    totalPages,
    paginatedVillas,
    villaToDelete,
    isDeleting,
    setCurrentPage,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleDeleteClose,
    handleDeleteConfirm,
    handlePerPageChange
  } = useVillasPage()

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} />

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
            <Button variant='emerald' size='sm' onClick={handleCreateClick}>
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
            <TableBody key={`${currentPage}-${perPage}`} className='animate-fade-in'>
              {paginatedVillas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-24 text-center text-muted-foreground'>
                    No villas found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVillas.map(villa => (
                  <TableRow key={villa.id}>
                    <TableCell className='pl-6 font-medium'>{villa.name}</TableCell>
                    <TableCell>${(villa.price ?? 0).toLocaleString()}/night</TableCell>
                    <TableCell>{(villa.sqft ?? 0).toLocaleString()} sqft</TableCell>
                    <TableCell>{villa.occupancy} guests</TableCell>
                    <TableCell className='pr-6'>
                      <div className='flex items-center justify-end gap-2'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='emerald' size='sm' onClick={() => handleEditClick(villa)}>
                              <Pencil className='h-4 w-4' />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='destructive' size='sm' onClick={() => handleDeleteClick(villa)}>
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
          <div className='border-t border-border/50 px-4 py-3'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              onPageChange={setCurrentPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        </CardContent>
      </Card>

      <DeleteVillaDialog
        villaToDelete={villaToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteClose}
      />
    </section>
  )
}

export default VillasPage
