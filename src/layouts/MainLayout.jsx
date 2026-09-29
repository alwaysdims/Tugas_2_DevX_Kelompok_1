import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

export default function MainLayout({ darkMode, setDarkMode, selectedItem, setSelectedItem, isLoaded }) {
  return (
    <div className={`site ${darkMode ? 'dark' : ''} ${isLoaded ? 'site-ready' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content" role="main">
        <Outlet context={{ darkMode, setSelectedItem }} />
      </main>
      <Footer />
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
