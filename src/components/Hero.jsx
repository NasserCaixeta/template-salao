import { site } from '../content/siteContent'

const scenes = [
  ['/media/hero-poster.jpg', 'Interior luminoso da Maison Auréa'],
  ['/media/service-cut.jpg', 'Profissional trabalhando no cabelo de uma cliente'],
  ['/media/service-color.jpg', 'Atendimento de beleza em luz natural'],
]

export default function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero__scenes" aria-label="Atendimento no salão Maison Auréa">
      {scenes.map(([src, alt], index) => <img src={src} alt={alt} className={`hero__scene hero__scene--${index + 1}`} key={src} />)}
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
