import { Loader2, OctagonAlert, Trash2 } from 'lucide-react'
import type { VillaNumber } from '@/api/villa-numbers'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface DeleteVillaNumberDialogProps {
  villaNumberToDelete: VillaNumber | null
  isDeleting: boolean
  onConfirm: () => void
  onClose: () => void
}

const DeleteVillaNumberDialog = ({ villaNumberToDelete, isDeleting, onConfirm, onClose }: DeleteVillaNumberDialogProps) => (
  <AlertDialog
    open={!!villaNumberToDelete}
    onOpenChange={open => { if (!open) onClose() }}
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <div className='flex items-center gap-3'>
          <OctagonAlert className='h-10 w-10 shrink-0 text-destructive' />
          <AlertDialogTitle>Delete Villa Number</AlertDialogTitle>
        </div>
        <AlertDialogDescription>
          Are you sure you want to delete{' '}
          <span className='font-semibold text-foreground'>Villa Number {villaNumberToDelete?.number}</span>?
          {' '}This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className='mt-6 flex justify-end gap-3'>
        <AlertDialogCancel asChild>
          <Button variant='outline' disabled={isDeleting}>
            Cancel
          </Button>
        </AlertDialogCancel>
        <Button variant='destructive' onClick={onConfirm} disabled={isDeleting}>
          {isDeleting
            ? <Loader2 className='h-4 w-4 animate-spin' />
            : <Trash2 className='h-4 w-4' />
          }
          {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
)

export default DeleteVillaNumberDialog
