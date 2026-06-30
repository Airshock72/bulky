import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteVillaNumber, getVillaNumbers } from '@/api/villa-numbers'
import type { VillaNumber } from '@/api/villa-numbers'
import { ROUTES, buildVillaNumberUpdateRoute } from '@/routes/routes'

type VillaNumberAction =
  | { type: 'SET_VILLA_NUMBERS'; payload: VillaNumber[] }
  | { type: 'DELETE_VILLA_NUMBER'; payload: number }

const villaNumberReducer = (state: VillaNumber[], action: VillaNumberAction): VillaNumber[] => {
  switch (action.type) {
  case 'SET_VILLA_NUMBERS': return action.payload
  case 'DELETE_VILLA_NUMBER': return state.filter(vn => vn.id !== action.payload)
  default: return state
  }
}

export const useVillaNumbersPage = () => {
  const navigate = useNavigate()
  const [villaNumbers, dispatch] = useReducer(villaNumberReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [villaNumberToDelete, setVillaNumberToDelete] = useState<VillaNumber | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    getVillaNumbers()
      .then(data => dispatch({ type: 'SET_VILLA_NUMBERS', payload: data }))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(villaNumbers.length / perPage)
  const paginatedVillaNumbers = villaNumbers.slice((currentPage - 1) * perPage, currentPage * perPage)

  const handleCreateClick = () => navigate(ROUTES.VILLA_NUMBERS_CREATE)

  const handleEditClick = (villaNumber: VillaNumber) =>
    navigate(buildVillaNumberUpdateRoute(villaNumber.id), { state: villaNumber })

  const handleDeleteClick = (villaNumber: VillaNumber) => setVillaNumberToDelete(villaNumber)

  const handleDeleteClose = () => { if (!isDeleting) setVillaNumberToDelete(null) }

  const handleDeleteConfirm = async () => {
    if (!villaNumberToDelete) return
    setIsDeleting(true)
    try {
      await deleteVillaNumber(villaNumberToDelete.id)
      const newTotalPages = Math.ceil((villaNumbers.length - 1) / perPage)
      setCurrentPage(prev => Math.min(prev, Math.max(1, newTotalPages)))
      dispatch({ type: 'DELETE_VILLA_NUMBER', payload: villaNumberToDelete.id })
      toast.success(`Villa Number ${villaNumberToDelete.number} deleted successfully`)
      setVillaNumberToDelete(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete villa number')
    } finally {
      setIsDeleting(false)
    }
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  return {
    villaNumbers,
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
  }
}
