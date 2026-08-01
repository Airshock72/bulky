import { useState, useEffect, useCallback, useRef } from 'react'
import { getVillas } from '@/api/villas'
import type { Villa } from '@/api/villas'

export const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80&fit=crop',
    title: 'Maldives Overwater Bliss',
    subtitle: 'Drift above crystal-clear turquoise waters in absolute luxury'
  },
  {
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80&fit=crop',
    title: 'Tropical Pool Retreat',
    subtitle: 'Private infinity pools surrounded by lush tropical gardens'
  },
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80&fit=crop',
    title: 'Beachfront Paradise',
    subtitle: 'Wake up to the gentle sound of waves at your doorstep'
  },
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80&fit=crop',
    title: 'Bali Jungle Escape',
    subtitle: 'Secluded villas nestled among lush rice terraces and jungle'
  },
  {
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80&fit=crop',
    title: 'Ocean Horizon Villa',
    subtitle: 'Floor-to-ceiling views where the sea meets the endless sky'
  }
]

export const NIGHTS_OPTIONS = Array.from({ length: 15 }, (_, i) => i + 1)

export const useHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [nights, setNights] = useState('')
  const [villas, setVillas] = useState<Villa[]>([])
  const [villasLoading, setVillasLoading] = useState(true)
  const [villasError, setVillasError] = useState<string | null>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    getVillas()
      .then(data => setVillas(data.slice(0, 4)))
      .catch(err => setVillasError(err instanceof Error ? err.message : String(err)))
      .finally(() => setVillasLoading(false))
  }, [])

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [startAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    startAutoPlay()
  }

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
    startAutoPlay()
  }

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    startAutoPlay()
  }

  const today = new Date().toISOString().split('T')[0]

  const handleCheckAvailability = () => {
    // TODO: navigate to availability results with checkIn and nights
  }

  return {
    currentSlide,
    checkIn,
    setCheckIn,
    nights,
    setNights,
    goToSlide,
    handlePrev,
    handleNext,
    handleCheckAvailability,
    isButtonDisabled: !checkIn || !nights,
    today,
    villas,
    villasLoading,
    villasError
  }
}
