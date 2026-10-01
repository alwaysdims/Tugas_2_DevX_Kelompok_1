import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import About from '../components/About'

export default function AboutPage() {
  const { darkMode } = useOutletContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <About darkMode={darkMode} />
}
