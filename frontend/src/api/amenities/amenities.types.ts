export interface Amenity {
  id: number
  name: string
  villaId: number
  villa: {
    id: number
    name: string
  }
  description: string | null
}
