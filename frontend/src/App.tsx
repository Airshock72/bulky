import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import VillasPage from '@/pages/VillasPage'

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.VILLAS} element={<VillasPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
