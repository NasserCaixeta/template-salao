import { useEffect, useRef, useState } from 'react'
import { site } from '../content/siteContent'

export default function Header({ menuOpen, onMenuToggle }) {
  const buttonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > window.innerHeight * .68)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape' && menuOpen) {
        onMenuToggle()
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, onMenuToggle])

  return <>
    <header className={`site-header ${compact ? 'is-compact' : ''}`}>
      <a className="site-header__brand" href="#inicio" aria-label="Maison Auréa — início">{site.brand}</a>
      <nav className="site-header__nav" aria-label="Principal">
        {site.navigation.map(link => <a href={link.href} key={link.href}>
          <span>{link.label}</span><span aria-hidden="true">{link.label}</span>
        </a>)}
      </nav>
      <div className="site-header__actions">
        <a className="header-cta" href={site.whatsapp} target="_blank" rel="noreferrer"><span>Agendar</span><b>↗</b></a>
        <button ref={buttonRef} className="menu-button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={onMenuToggle}><i/><i/></button>
      </div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <span>MENU · MAISON AURÉA</span>
      <nav aria-label="Menu móvel">{site.navigation.map((link, index) => <a ref={index === 0 ? firstLinkRef : undefined} href={link.href} key={link.href} onClick={onMenuToggle}><small>0{index + 1}</small>{link.label}</a>)}</nav>
      <p>Seg—Sáb · 09h às 20h<br/>Brasília · DF</p>
    </div>
  </>
}
