import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteVilla, getVillas } from '@/api/villas'
import type { Villa } from '@/api/villas'
import { ROUTES, buildVillaUpdateRoute } from '@/routes/routes'

type VillaAction =
  | { type: 'SET_VILLAS'; payload: Villa[] }
  | { type: 'DELETE_VILLA'; payload: number }

const villaReducer = (state: Villa[], action: VillaAction): Villa[] => {
  switch (action.type) {
  case 'SET_VILLAS': return action.payload
  case 'DELETE_VILLA': return state.filter(v => v.id !== action.payload)
  default: return state
  }
}

export const useVillasPage = () => {
  const navigate = useNavigate()
  const [villas, dispatch] = useReducer(villaReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [villaToDelete, setVillaToDelete] = useState<Villa | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    getVillas()
      .then(data => dispatch({ type: 'SET_VILLAS', payload: data }))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(villas.length / perPage)
  const paginatedVillas = villas.slice((currentPage - 1) * perPage, currentPage * perPage)

  const handleCreateClick = () => navigate(ROUTES.VILLAS_CREATE)

  const handleEditClick = (villa: Villa) =>
    navigate(buildVillaUpdateRoute(villa.id), { state: villa })

  const handleDeleteClick = (villa: Villa) => setVillaToDelete(villa)

  const handleDeleteClose = () => { if (!isDeleting) setVillaToDelete(null) }

  const handleDeleteConfirm = async () => {
    if (!villaToDelete) return
    setIsDeleting(true)
    try {
      await deleteVilla(villaToDelete.id)
      const newTotalPages = Math.ceil((villas.length - 1) / perPage)
      setCurrentPage(prev => Math.min(prev, Math.max(1, newTotalPages)))
      dispatch({ type: 'DELETE_VILLA', payload: villaToDelete.id })
      toast.success(`"${villaToDelete.name}" deleted successfully`)
      setVillaToDelete(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete villa')
    } finally {
      setIsDeleting(false)
    }
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  return {
    villas,
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
  }
}
