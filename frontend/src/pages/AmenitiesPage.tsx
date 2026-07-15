import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useAmenitiesPage } from '@/hooks/useAmenitiesPage'
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
import DeleteAmenityDialog from '@/components/DeleteAmenityDialog'
import Pagination from '@/components/Pagination'
import PageLoader from '@/pages/PageLoader'
import PageError from '@/pages/PageError'

const AmenitiesPage = () => {
  const {
    loading,
    error,
    currentPage,
    perPage,
    totalPages,
    paginatedAmenities,
    amenityToDelete,
    isDeleting,
    setCurrentPage,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleDeleteClose,
    handleDeleteConfirm,
    handlePerPageChange
  } = useAmenitiesPage()

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} />

  return (
    <section className='mx-auto max-w-4xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg hover:shadow-xl'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='flex items-center justify-end border-b border-border/50 px-6 py-3'>
            <Button variant='emerald' size='sm' onClick={handleCreateClick}>
              <Plus className='h-4 w-4' />
              Create New Amenity
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className='border-0 hover:bg-transparent'>
                <TableHead className='pl-6'>Villa Name</TableHead>
                <TableHead>Amenity Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className='pr-6 text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody key={`${currentPage}-${perPage}`} className='animate-fade-in'>
              {paginatedAmenities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                    No amenities found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAmenities.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className='pl-6 font-medium'>{a.villa.name}</TableCell>
                    <TableCell>{a.name}</TableCell>
                    <TableCell className='max-w-xs truncate text-muted-foreground'>
                      {a.description ?? '—'}
                    </TableCell>
                    <TableCell className='pr-6'>
                      <div className='flex items-center justify-end gap-2'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='emerald' size='sm' onClick={() => handleEditClick(a)}>
                              <Pencil className='h-4 w-4' />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='destructive' size='sm' onClick={() => handleDeleteClick(a)}>
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

      <DeleteAmenityDialog
        amenityToDelete={amenityToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteClose}
      />
    </section>
  )
}

export default AmenitiesPage
