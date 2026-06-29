import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import VillasPage from '@/pages/VillasPage'
import CreateVillaPage from '@/pages/CreateVillaPage'
import { Toaster } from '@/components/ui/sonner'

const App = () => (
  <>
    <Toaster richColors position='top-right' />
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.VILLAS} element={<VillasPage />} />
        <Route path={ROUTES.VILLAS_CREATE} element={<CreateVillaPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </>
)

export default App
