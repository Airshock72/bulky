import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useVillaNumbersPage } from '@/hooks/useVillaNumbersPage'
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
import DeleteVillaNumberDialog from '@/components/DeleteVillaNumberDialog'
import Pagination from '@/components/Pagination'
import PageLoader from '@/pages/PageLoader'
import PageError from '@/pages/PageError'

const VillaNumbersPage = () => {
  const {
    loading,
    error,
    currentPage,
    perPage,
    totalPages,
    paginatedVillaNumbers,
    villaNumberToDelete,
    isDeleting,
    setCurrentPage,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleDeleteClose,
    handleDeleteConfirm,
    handlePerPageChange
  } = useVillaNumbersPage()

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} />

  return (
    <section className='mx-auto max-w-4xl px-6 py-12 animate-fade-in-up'>
      <Card className='overflow-hidden shadow-lg hover:shadow-xl'>
        <CardHeader className='border-b border-border/60 bg-linear-to-b from-emerald-900 to-emerald-700 px-6 py-8'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
            Villa Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='flex items-center justify-end border-b border-border/50 px-6 py-3'>
            <Button variant='emerald' size='sm' onClick={handleCreateClick}>
              <Plus className='h-4 w-4' />
              Create New Villa Number
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className='border-0 hover:bg-transparent'>
                <TableHead>Villa Number</TableHead>
                <TableHead>Special Details</TableHead>
                <TableHead className='pr-6 text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody key={`${currentPage}-${perPage}`} className='animate-fade-in'>
              {paginatedVillaNumbers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                    No villa numbers found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVillaNumbers.map(vn => (
                  <TableRow key={vn.id}>
                    <TableCell>{vn.number}</TableCell>
                    <TableCell className='max-w-xs truncate text-muted-foreground'>
                      {vn.specialDetails ?? '—'}
                    </TableCell>
                    <TableCell className='pr-6'>
                      <div className='flex items-center justify-end gap-2'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='emerald' size='sm' onClick={() => handleEditClick(vn)}>
                              <Pencil className='h-4 w-4' />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant='destructive' size='sm' onClick={() => handleDeleteClick(vn)}>
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

      <DeleteVillaNumberDialog
        villaNumberToDelete={villaNumberToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteClose}
      />
    </section>
  )
}

export default VillaNumbersPage
