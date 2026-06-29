import type { ReactNode } from 'react'
import Header from '@/components/Header'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
