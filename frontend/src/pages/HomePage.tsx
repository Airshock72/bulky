import { ChevronLeft, ChevronRight } from 'lucide-react'
import SliderDots from '@/components/SliderDots'
import BookingBar from '@/components/BookingBar'
import FeaturedVillasSection from '@/components/FeaturedVillasSection'
import { useHomePage, SLIDES } from '@/hooks/useHomePage'

const HomePage = () => {
  const {
    currentSlide,
    checkIn,
    setCheckIn,
    nights,
    setNights,
    goToSlide,
    handlePrev,
    handleNext,
    handleCheckAvailability,
    isButtonDisabled,
    today,
    villas,
    villasLoading,
    villasError
  } = useHomePage()

  return (
    <div>
      <div className='relative w-full h-[72vh] min-h-120 overflow-hidden bg-slate-900'>
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full object-cover'
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className='absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/60' />
            <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white'>
              <h2
                className={`mb-4 text-4xl font-bold tracking-tight drop-shadow-lg transition-all duration-700 md:text-6xl ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                {slide.title}
              </h2>
              <p
                className={`text-lg text-white/85 drop-shadow transition-all duration-700 delay-100 md:text-xl ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrev}
          aria-label='Previous slide'
          className='absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          onClick={handleNext}
          aria-label='Next slide'
          className='absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55'
        >
          <ChevronRight className='h-5 w-5' />
        </button>

        <SliderDots count={SLIDES.length} current={currentSlide} onSelect={goToSlide} />
      </div>

      <BookingBar
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        nights={nights}
        setNights={setNights}
        today={today}
        isButtonDisabled={isButtonDisabled}
        onCheckAvailability={handleCheckAvailability}
      />

      <FeaturedVillasSection
        villas={villas}
        loading={villasLoading}
        error={villasError}
      />
    </div>
  )
}

export default HomePage
