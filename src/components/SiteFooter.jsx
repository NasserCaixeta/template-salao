import { site } from '../content/siteContent'

export default function SiteFooter() {
  return <footer className="site-footer">
    <section className="final-cta">
      <span>03 · Seu momento</span>
      <h2>Pronta para se olhar<br/><em>de um novo jeito?</em></h2>
      <a href={site.whatsapp} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <b>↗</b></a>
    </section>
    <div className="footer-nav">
      <p>Beleza com intenção,<br/>técnica e tempo para você.</p>
      <nav aria-label="Rodapé">{site.navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <address>SHIS QI 11 · Lago Sul<br/>Brasília · DF<br/><br/>Seg—Sáb · 09h às 20h</address>
    </div>
    <div className="footer-legal"><span>© 2026 MAISON AURÉA</span><a href="#inicio">Voltar ao topo ↑</a></div>
  </footer>
}
