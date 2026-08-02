import { useEffect, useState } from 'react'
import Header from './components/Header'
import Opening from './components/Opening'
import Hero from './components/Hero'
import ServicesStack from './components/ServicesStack'
import MethodStack from './components/MethodStack'
import Story from './components/Story'
import SiteFooter from './components/SiteFooter'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false'
    return () => delete document.body.dataset.menuOpen
  }, [menuOpen])

  return <>
    <Opening />
    <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(value => !value)} />
    <main><Hero /><ServicesStack /><MethodStack /><Story /></main>
    <SiteFooter />
  </>
}
