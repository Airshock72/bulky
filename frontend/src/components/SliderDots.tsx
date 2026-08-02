interface SliderDotsProps {
  count: number
  current: number
  onSelect: (index: number) => void
}

const SliderDots = ({ count, current, onSelect }: SliderDotsProps) => (
  <div className='absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2'>
    {Array.from({ length: count }, (_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        aria-label={`Go to slide ${index + 1}`}
        className={`cursor-pointer rounded-full transition-all duration-300 ${
          index === current
            ? 'h-2.5 w-8 bg-white'
            : 'h-2.5 w-2.5 bg-white/45 hover:bg-white/70'
        }`}
      />
    ))}
  </div>
)

export default SliderDots
