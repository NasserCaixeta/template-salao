import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Opening() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduced ? 120 : 1750)
    return () => clearTimeout(timer)
  }, [reduced])

  return visible ? <div className="opening" aria-hidden="true">
    <span className="opening__line" />
    <span className="opening__brand">MAISON AURÉA</span>
    <span className="opening__place">BRASÍLIA · 2026</span>
  </div> : null
}
