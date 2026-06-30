import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import VillasPage from '@/pages/VillasPage'
import CreateAndEditVillaPage from '@/pages/CreateAndEditVillaPage'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const App = () => (
  <TooltipProvider>
    <Toaster richColors position='top-right' />
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.VILLAS} element={<VillasPage />} />
        <Route path={ROUTES.VILLAS_CREATE} element={<CreateAndEditVillaPage />} />
        <Route path={ROUTES.VILLAS_UPDATE} element={<CreateAndEditVillaPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </TooltipProvider>
)

export default App
