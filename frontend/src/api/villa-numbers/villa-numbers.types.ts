export interface VillaNumber {
  id: number
  number: number
  villaId: number
  villa: {
    id: number
    name: string
  }
  specialDetails: string | null
}
