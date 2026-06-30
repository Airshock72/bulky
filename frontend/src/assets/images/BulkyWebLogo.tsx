import { useTheme } from '@/hooks/useTheme'

const BulkyWebLogo = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const gradStart = isDark ? '#059669' : '#064e3b'
  const gradMid   = isDark ? '#10b981' : '#059669'
  const gradEnd   = isDark ? '#a7f3d0' : '#34d399'

  return (
    <svg
      width='26'
      height='32'
      viewBox='0 0 36 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      className='shrink-0 drop-shadow-[0_1px_5px_rgba(4,120,87,0.5)] dark:drop-shadow-[0_1px_7px_rgba(52,211,153,0.4)]'
    >
      <defs>
        {/* Main diagonal gradient: dark top-left → light bottom-right */}
        <linearGradient
          id='bulkyLogoGrad'
          x1='3' y1='2' x2='35' y2='42'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0%' stopColor={gradStart} />
          <stop offset='50%' stopColor={gradMid} />
          <stop offset='100%' stopColor={gradEnd} />
        </linearGradient>

        {/* Top-to-bottom shine for the upper half */}
        <linearGradient
          id='bulkyLogoShine'
          x1='0' y1='0' x2='0' y2='1'
        >
          <stop offset='0%' stopColor='white' stopOpacity='0.28' />
          <stop offset='100%' stopColor='white' stopOpacity='0' />
        </linearGradient>
      </defs>

      {/*
        B outer boundary (clockwise) + two counter holes (evenodd rule cuts them out):

        Stem:       x 3–13,  y 2–42  (width 10, height 40)
        Top lobe:   bezier from (13,2) → (13,21) bulging to x≈27 at y≈11.5
        Bot lobe:   bezier from (13,21) → (13,42) bulging to x≈29.5 at y≈31.5
        Top eye:    bezier from (13,6) → (13,17)  bulging to x≈22  at y≈11.5
        Bot eye:    bezier from (13,24) → (13,39) bulging to x≈23.5 at y≈31.5
      */}
      <path
        fillRule='evenodd'
        fill='url(#bulkyLogoGrad)'
        d='
          M 3 2 L 13 2
          C 32 2 32 21 13 21
          C 35 21 35 42 13 42
          L 3 42 Z
          M 13 6  C 25 6  25 17 13 17  Z
          M 13 24 C 27 24 27 39 13 39  Z
        '
      />

      {/* Shine overlay — covers top stem + top lobe, eye subtracted via evenodd */}
      <path
        fillRule='evenodd'
        fill='url(#bulkyLogoShine)'
        d='
          M 3 2 L 13 2
          C 32 2 32 21 13 21
          L 3 21 Z
          M 13 6 C 25 6 25 17 13 17 Z
        '
      />
    </svg>
  )
}

export default BulkyWebLogo
