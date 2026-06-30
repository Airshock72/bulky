import type { ReactNode } from 'react'
import Header from '@/components/Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <div className='flex min-h-screen flex-col'>
    <Header />
    <main className='flex-1'>{children}</main>
  </div>
)

export default Layout
