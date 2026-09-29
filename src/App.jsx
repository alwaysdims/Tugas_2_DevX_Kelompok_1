import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import IntroLoader from './components/IntroLoader'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

// ponytail: BrowserRouter with client-side routes. vercel.json handles wildcard rewrite.
export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      {showLoader && (
        <IntroLoader
          onExitStart={() => setIsLoaded(true)}
          onComplete={() => setShowLoader(false)}
        />
      )}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isLoaded={isLoaded}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
