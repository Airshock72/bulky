import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'bulky-theme'

const resolveTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    console.error('Failed to read theme from localStorage')
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Runs synchronously at module import time — applies theme before first React render
const initialTheme = resolveTheme()
document.documentElement.classList.toggle('dark', initialTheme === 'dark')

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      console.error(`Failed to save theme "${theme}" to localStorage`)
    }
  }, [theme])

  return { theme, setTheme: setThemeState }
}
