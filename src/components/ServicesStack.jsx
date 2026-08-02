import { useCallback, useEffect, useRef } from 'react'
import { services } from '../content/siteContent'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollScenes } from '../hooks/useScrollScenes'

export function ServiceMedia({ service }) {
  const videoRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (service.type !== 'video' || reducedMotion) return
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
  }, [reducedMotion, service.type])

  if (service.type !== 'video' || reducedMotion) {
    return <img src={service.type === 'video' ? service.poster : service.media} alt={service.alt} loading="lazy" />
  }

  return <video
    ref={videoRef}
    src={service.media}
    poster={service.poster}
    aria-label={service.alt}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
  />
}

export default function ServicesStack() {
  const scope = useRef(null)
  const build = useCallback(({ gsap }) => {
    const cards = gsap.utils.toArray('.service-card')
    const timeline = gsap.timeline({ scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom bottom', scrub: .7 } })
    cards.forEach((card, index) => timeline.fromTo(card,
      { yPercent: 115, rotate: index % 2 ? 3 : -3 },
      { yPercent: 0, rotate: index % 2 ? 1.2 : -1.2, duration: 1, ease: 'none' }, index * .95))
  }, [])
  useScrollScenes(scope, build)

  return <section className="services-stack" id="servicos" ref={scope}>
    <div className="services-stack__sticky">
      <div className="services-stack__intro"><span>01 · Serviços</span><h2>Técnica para transformar.<br/><em>Sensibilidade para preservar.</em></h2><p>Quatro rituais, uma mesma ideia: fazer cada escolha conversar com você.</p></div>
      <div className="services-stack__cards">{services.map(service => <article className="service-card" data-testid="service-card" data-title={service.title} key={service.title}>
        <div className="service-card__copy"><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p></div>
        <ServiceMedia service={service} />
      </article>)}</div>
    </div>
  </section>
}
