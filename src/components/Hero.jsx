import { useEffect, useRef } from 'react'
import { site } from '../content/siteContent'
import { useReducedMotion } from '../hooks/useReducedMotion'

const scenes = [
  { type: 'image', src: '/media/hero-editorial-waves-v3.png', alt: 'Ondas castanhas finalizadas em um salão' },
  { type: 'video', src: '/media/hero-hair-reveal-v3.mp4', poster: '/media/hero-hair-reveal-poster-v3.png', alt: 'Cabelo castanho longo e brilhante sendo revelado dentro do salão' },
  { type: 'image', src: '/media/hero-editorial-curls-v3.png', alt: 'Cachos definidos e luminosos finalizados em um salão' },
]

function HeroScene({ scene, index }) {
  const videoRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const className = `hero__scene hero__scene--${index + 1}`

  useEffect(() => {
    if (scene.type !== 'video' || reducedMotion) return
    const video = videoRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else if (!video.paused) video.pause()
    }, { threshold: .2 })
    observer.observe(video)
    return () => {
      observer.disconnect()
      if (!video.paused) video.pause()
    }
  }, [reducedMotion, scene.type])

  if (scene.type === 'video' && !reducedMotion) {
    return <video ref={videoRef} src={scene.src} poster={scene.poster} aria-label={scene.alt} className={className} autoPlay muted loop playsInline preload="metadata" />
  }

  return <img src={scene.type === 'video' ? scene.poster : scene.src} alt={scene.alt} className={className} fetchPriority={index === 0 ? 'high' : 'auto'} />
}

export default function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero__scenes" aria-label="Atendimento no salão Maison Auréa">
      {scenes.map((scene, index) => <HeroScene scene={scene} index={index} key={scene.src} />)}
    </div>
    <div className="hero__shade" aria-hidden="true" />
    <div className="hero__meta"><span>CORTE · COR · CUIDADO</span><span>BRASÍLIA · DF</span></div>
    <div className="hero__copy">
      <p>Beleza autoral · cuidado preciso</p>
      <h1>Seu brilho,<br/><em>em primeiro plano.</em></h1>
      <div><span>Uma experiência desenhada em torno de você, do primeiro olhar à finalização.</span><a href={site.whatsapp} target="_blank" rel="noreferrer">Agendar sua experiência <b>↗</b></a></div>
    </div>
    <span className="hero__scroll">Role para descobrir <i>↓</i></span>
  </section>
}
