import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteAmenity, getAmenities } from '@/api/amenities'
import type { Amenity } from '@/api/amenities'
import { ROUTES, buildAmenityUpdateRoute } from '@/routes/routes'

type AmenityAction =
  | { type: 'SET_AMENITIES'; payload: Amenity[] }
  | { type: 'DELETE_AMENITY'; payload: number }

const amenityReducer = (state: Amenity[], action: AmenityAction): Amenity[] => {
  switch (action.type) {
  case 'SET_AMENITIES': return action.payload
  case 'DELETE_AMENITY': return state.filter(a => a.id !== action.payload)
  default: return state
  }
}

export const useAmenitiesPage = () => {
  const navigate = useNavigate()
  const [amenities, dispatch] = useReducer(amenityReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [amenityToDelete, setAmenityToDelete] = useState<Amenity | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    getAmenities()
      .then(data => dispatch({ type: 'SET_AMENITIES', payload: data }))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(amenities.length / perPage)
  const paginatedAmenities = amenities.slice((currentPage - 1) * perPage, currentPage * perPage)

  const handleCreateClick = () => navigate(ROUTES.AMENITIES_CREATE)

  const handleEditClick = (amenity: Amenity) =>
    navigate(buildAmenityUpdateRoute(amenity.id), { state: amenity })

  const handleDeleteClick = (amenity: Amenity) => setAmenityToDelete(amenity)

  const handleDeleteClose = () => { if (!isDeleting) setAmenityToDelete(null) }

  const handleDeleteConfirm = async () => {
    if (!amenityToDelete) return
    setIsDeleting(true)
    try {
      await deleteAmenity(amenityToDelete.id)
      const newTotalPages = Math.ceil((amenities.length - 1) / perPage)
      setCurrentPage(prev => Math.min(prev, Math.max(1, newTotalPages)))
      dispatch({ type: 'DELETE_AMENITY', payload: amenityToDelete.id })
      toast.success(`Amenity ${amenityToDelete.name} deleted successfully`)
      setAmenityToDelete(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete amenity')
    } finally {
      setIsDeleting(false)
    }
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  return {
    amenities,
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
  }
}
