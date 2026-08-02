import VillaCard, { VillaCardSkeleton } from '@/components/VillaCard'
import type { Villa } from '@/api/villas'

interface FeaturedVillasSectionProps {
  villas: Villa[]
  loading: boolean
  error: string | null
}

const FeaturedVillasSection = ({ villas, loading, error }: FeaturedVillasSectionProps) => (
  <section className='mx-auto max-w-10/12 px-6 py-12'>
    <h2 className='mb-7 text-2xl font-bold tracking-tight'>Featured Villas</h2>
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
      {loading
        ? Array.from({ length: 4 }, (_, i) => <VillaCardSkeleton key={i} />)
        : error
          ? <p className='col-span-2 text-sm text-muted-foreground'>{error}</p>
          : villas.map(villa => <VillaCard key={villa.id} villa={villa} />)
      }
    </div>
  </section>
)

export default FeaturedVillasSection
