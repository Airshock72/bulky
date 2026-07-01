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
}

export interface VillaListItem {
  id: number
  name: string
}
