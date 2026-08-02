import { useCallback, useRef } from 'react'
import { services } from '../content/siteContent'
import { useScrollScenes } from '../hooks/useScrollScenes'

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
        <img src={service.media} alt={`Atendimento de ${service.title.toLowerCase()} na Maison Auréa`} loading="lazy" />
      </article>)}</div>
    </div>
  </section>
}
