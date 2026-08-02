export interface VillaAmenity {
  id: number
  name: string
  description: string | null
}

export interface Villa {
  id: number
  name: string
  description: string
  price: number
  sqft: number
  occupancy: number
  imageUrl: string
  createdDate: string
  updatedDate: string
  amenities?: VillaAmenity[]
}

export interface VillaListItem {
  id: number
  name: string
}
