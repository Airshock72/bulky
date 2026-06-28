import { useEffect, useState } from 'react'

interface Villa {
  id: number
  name: string
  details: string
  rate: number
  sqft: number
  occupancy: number
  imageUrl: string
  amenity: string
  createdDate: string
  updatedDate: string
}

export default function VillasPage() {
  const [villas, setVillas] = useState<Array<Villa>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/villa`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Array<Villa>>
      })
      .then(data => setVillas(data))
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading villas...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Villas</h1>
      <ul>
        {villas.map(villa => (
          <li key={villa.id}>
            <strong>{villa.name}</strong> — ${villa.rate}/night
          </li>
        ))}
      </ul>
    </div>
  )
}
