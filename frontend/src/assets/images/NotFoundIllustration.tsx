const NotFoundIllustration = () => (
  <svg
    width='320'
    height='250'
    viewBox='0 0 320 250'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-emerald-500 dark:text-emerald-400'
    aria-hidden='true'
  >
    {/* Stars */}
    <circle cx='22' cy='18' r='2' fill='currentColor' fillOpacity='0.45' />
    <circle cx='90' cy='10' r='1.5' fill='currentColor' fillOpacity='0.3' />
    <circle cx='240' cy='16' r='2.5' fill='currentColor' fillOpacity='0.35' />
    <circle cx='295' cy='48' r='1.5' fill='currentColor' fillOpacity='0.3' />
    <circle cx='8' cy='148' r='2' fill='currentColor' fillOpacity='0.25' />
    <circle cx='308' cy='125' r='1.5' fill='currentColor' fillOpacity='0.4' />
    <circle cx='42' cy='225' r='2' fill='currentColor' fillOpacity='0.3' />
    <circle cx='265' cy='200' r='2.5' fill='currentColor' fillOpacity='0.25' />
    <circle cx='145' cy='6' r='1.5' fill='currentColor' fillOpacity='0.35' />
    <circle cx='60' cy='75' r='1.5' fill='currentColor' fillOpacity='0.2' />
    <circle cx='270' cy='170' r='1.5' fill='currentColor' fillOpacity='0.25' />

    {/* Planet body */}
    <circle cx='155' cy='162' r='72' fill='currentColor' fillOpacity='0.06' />
    <circle cx='155' cy='162' r='72' stroke='currentColor' strokeWidth='2.5' strokeOpacity='0.35' />
    {/* Rings */}
    <ellipse cx='155' cy='162' rx='108' ry='24' stroke='currentColor' strokeWidth='2' strokeOpacity='0.3' fill='none' />
    {/* Craters */}
    <circle cx='126' cy='144' r='13' stroke='currentColor' strokeWidth='1.5' strokeOpacity='0.22' fill='none' />
    <circle cx='175' cy='178' r='9' stroke='currentColor' strokeWidth='1.5' strokeOpacity='0.18' fill='none' />
    <circle cx='143' cy='180' r='5.5' stroke='currentColor' strokeWidth='1.5' strokeOpacity='0.18' fill='none' />

    {/* Floating question mark */}
    <text
      x='48'
      y='90'
      fontSize='56'
      fontWeight='900'
      fill='currentColor'
      fillOpacity='0.13'
      fontFamily='system-ui, sans-serif'
    >
      ?
    </text>

    {/* Dashed tether */}
    <path
      d='M157 88 Q182 52 222 40'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeDasharray='5 4'
      strokeOpacity='0.28'
      fill='none'
    />

    {/* Astronaut — helmet */}
    <circle cx='225' cy='58' r='24' fill='currentColor' fillOpacity='0.1' />
    <circle cx='225' cy='58' r='24' stroke='currentColor' strokeWidth='2.5' strokeOpacity='0.65' />
    {/* Visor */}
    <ellipse cx='225' cy='57' rx='14' ry='11' fill='currentColor' fillOpacity='0.28' />
    {/* Helmet reflection glint */}
    <path d='M214 46 Q217 42 222 44' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeOpacity='0.4' />
    {/* Body */}
    <rect x='210' y='81' width='30' height='28' rx='8' fill='currentColor' fillOpacity='0.1' stroke='currentColor' strokeWidth='2.2' strokeOpacity='0.65' />
    {/* Chest panel */}
    <rect x='216' y='87' width='18' height='10' rx='3' stroke='currentColor' strokeWidth='1.2' strokeOpacity='0.4' fill='none' />
    {/* Left arm */}
    <path d='M210 91 L190 102' stroke='currentColor' strokeWidth='4.5' strokeLinecap='round' strokeOpacity='0.6' />
    {/* Right arm — waving */}
    <path d='M240 91 L258 78' stroke='currentColor' strokeWidth='4.5' strokeLinecap='round' strokeOpacity='0.6' />
    {/* Legs */}
    <path d='M217 109 L210 128' stroke='currentColor' strokeWidth='4.5' strokeLinecap='round' strokeOpacity='0.6' />
    <path d='M233 109 L240 128' stroke='currentColor' strokeWidth='4.5' strokeLinecap='round' strokeOpacity='0.6' />
  </svg>
)

export default NotFoundIllustration
