import { useEffect, useRef, useState } from 'react'

const services = [
  ['01 · FORMA', 'Cortes autorais', 'Linhas pensadas para seu rosto, textura e movimento natural.'],
  ['02 · LUZ', 'Cor & iluminação', 'Tons sofisticados, transições suaves e brilho com profundidade.'],
  ['03 · MATÉRIA', 'Tratamentos', 'Protocolos de reconstrução, nutrição e recuperação sob medida.'],
  ['04 · RITUAL', 'Noivas & eventos', 'Beleza completa criada em harmonia com seu momento.'],
]

const steps = [
  ['Escuta & diagnóstico', 'Conversamos sobre você, analisamos os fios e construímos a direção do atendimento.'],
  ['Criação sob medida', 'Técnica, cor e tratamento são combinados de forma personalizada — sem soluções automáticas.'],
  ['Finalização & continuidade', 'Você sai sabendo como manter o resultado em casa e quando será ideal retornar.'],
]

function App() {
  const [entered, setEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [step, setStep] = useState(0)
  const methodRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('is-locked', !entered || menuOpen)
    return () => document.body.classList.remove('is-locked')
  }, [entered, menuOpen])

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const header = document.querySelector('.site-header')
      header?.classList.toggle('is-scrolled', scrollY > innerHeight * .72)
      header?.classList.toggle('is-hidden', scrollY > 400 && scrollY > last)
      last = scrollY
      if (methodRef.current) {
        const r = methodRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(0.999, -r.top / (r.height - innerHeight)))
        setStep(Math.floor(progress * 3))
      }
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: .12 })
    document.querySelectorAll('.reveal-block, .reveal-media, .split-lines').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [entered])

  const enter = withSound => {
    setMuted(!withSound)
    setEntered(true)
  }

  return <>
    <div className="noise" aria-hidden="true" />

    {!entered && <div className="entry" role="dialog" aria-modal="true" aria-label="Boas-vindas">
      <div className="entry__veil" />
      <div className="entry__content">
        <div className="entry__eyebrow">MAISON AURÉA · BRASÍLIA</div>
        <div className="entry__monogram" aria-hidden="true">
          <svg viewBox="0 0 160 160" fill="none"><circle cx="80" cy="80" r="62" stroke="currentColor" opacity=".45"/><path d="M39 111C57 77 62 45 80 31C90 52 105 73 121 111" stroke="currentColor" strokeWidth="2"/><path d="M52 104C72 91 88 91 109 104" stroke="currentColor"/></svg>
        </div>
        <h1 className="entry__title">Uma experiência<br/><em>feita para você.</em></h1>
        <p className="entry__text">Entre em um espaço pensado para desacelerar, cuidar e transformar.</p>
        <div className="entry__actions">
          <button className="text-button" onClick={() => enter(false)}>Entrar sem som</button>
          <button className="pill-button" onClick={() => enter(true)}><span>Entrar com som</span><b>↗</b></button>
        </div>
      </div>
    </div>}

    <header className="site-header">
      <a className="brand" href="#inicio"><span className="brand__main">MAISON</span><span className="brand__script">Auréa</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#experiencia">A experiência</a><a href="#servicos">Serviços</a><a href="#metodo">Como funciona</a>
      </nav>
      <div className="header-actions">
        <button className={`sound-toggle ${muted ? 'is-muted' : ''}`} onClick={() => setMuted(v => !v)} aria-label="Ativar ou desativar som"><i/><i/><i/><i/></button>
        <a className="header-cta" href="#agendar">Agendar horário <span>↗</span></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu"><span/><span/></button>
      </div>
    </header>

    <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <div className="menu-panel__inner"><div className="menu-panel__meta">MENU · 01—05</div>
        <nav>{[['01','Início','#inicio'],['02','A experiência','#experiencia'],['03','Serviços','#servicos'],['04','Como funciona','#metodo'],['05','Agendar','#agendar']].map(([n,l,h]) => <a href={h} key={n} onClick={() => setMenuOpen(false)}><span>{n}</span>{l}</a>)}</nav>
        <div className="menu-panel__footer"><span>Seg—Sáb · 09h às 20h</span><span>Brasília · DF</span></div>
      </div>
    </div>

    <main>
      <section className="hero" id="inicio">
        <div className="hero__media" aria-hidden="true"><div className="hero__image hero__image--back"/><div className="hero__image hero__image--front"/><div className="hero__wash"/></div>
        <div className="hero__topline"><span>CORTE · COR · TRATAMENTO</span><span>EST. 2026</span></div>
        <div className="hero__content">
          <p className="hero__kicker">Beleza autoral, cuidado preciso.</p>
          <h1 className="hero__title">O tempo muda tudo.<br/><em>Seu brilho, não.</em></h1>
          <div className="hero__bottom"><p>Um salão criado para revelar sua melhor versão — com escuta, técnica e uma experiência sem pressa.</p><a href="#agendar" className="round-link"><span>Agendar</span><b>↘</b></a></div>
        </div>
        <div className="hero__scroll">Role para descobrir <span/></div>
      </section>

      <section className="intro section-pad" id="experiencia">
        <div className="section-index">01 · A EXPERIÊNCIA</div>
        <div className="intro__grid"><h2 className="display-copy split-lines">Seu cabelo não entra<br/>em uma fórmula.</h2><div className="intro__copy reveal-block"><p>Na Maison Auréa, cada atendimento começa antes do primeiro corte. Entendemos sua rotina, sua textura, suas referências e o que você deseja sentir quando se olhar no espelho.</p><a className="underlined-link" href="#metodo">Conheça nosso método <span>↗</span></a></div></div>
        <div className="intro__portrait reveal-media"><div className="portrait__frame"><div className="portrait__image"/><div className="portrait__caption"><span>01</span><span>Diagnóstico individual</span></div></div><div className="portrait__quote"><span>“</span><p>Elegância não é excesso.<br/>É precisão.</p></div></div>
      </section>

      <section className="principles">
        <div className="principles__marquee"><div className="marquee-track"><span>ESCUTA REAL</span><i>✦</i><span>TÉCNICA PRECISA</span><i>✦</i><span>RESULTADO AUTORAL</span><i>✦</i><span>ESCUTA REAL</span><i>✦</i><span>TÉCNICA PRECISA</span><i>✦</i><span>RESULTADO AUTORAL</span><i>✦</i></div></div>
        <div className="principles__grid">
          <article><span>01</span><h3>Consulta sem pressa</h3><p>Antes de sugerir qualquer mudança, entendemos seu cabelo e o resultado que faz sentido para você.</p></article>
          <article><span>02</span><h3>Produtos selecionados</h3><p>Protocolos premium, escolhidos conforme a estrutura e as necessidades reais dos fios.</p></article>
          <article><span>03</span><h3>Beleza sustentável</h3><p>Um resultado que continua bonito depois do salão e funciona na sua rotina.</p></article>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="services__head"><div className="section-index">02 · SERVIÇOS</div><h2 className="display-copy split-lines">Técnica para transformar.<br/><em>Sensibilidade para preservar.</em></h2></div>
        <div className="horizontal-shell"><div className="horizontal-track">{services.map(([tag,title,copy], i) => <article className={`service-card service-card--${i+1}`} key={title}><div className="service-card__media"><div/></div><div className="service-card__content"><span>{tag}</span><h3>{title}</h3><p>{copy}</p><a href="#agendar">Ver atendimento <span>↗</span></a></div></article>)}</div></div>
      </section>

      <section className="method" id="metodo" ref={methodRef}><div className="method__sticky">
        <div className="method__visual">{steps.map((_,i)=><div key={i} className={`method__image method__image--${i+1} ${step === i ? 'is-active' : ''}`}/>)}<div className="method__counter"><span>0{step+1}</span><i/><span>03</span></div></div>
        <div className="method__content"><div className="section-index">03 · COMO FUNCIONA</div><h2 className="display-copy">Um ritual simples.<br/><em>Um resultado único.</em></h2><div className="method__steps">{steps.map(([title,copy],i)=><article className={`method-step ${step===i?'is-active':''}`} key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      </div></section>

      <section className="story section-pad"><div className="section-index">04 · HISTÓRIAS REAIS</div><div className="story__layout"><div className="story__media reveal-media"><div className="story__image"/><span>RESULTADO · COR, CORTE E TRATAMENTO</span></div><blockquote className="story__quote reveal-block"><p>“Foi a primeira vez que senti que alguém entendeu meu cabelo antes de tentar mudá-lo.”</p><footer><span>Marina A.</span><span>Cliente Maison Auréa</span></footer></blockquote></div></section>

      <section className="booking" id="agendar"><div className="booking__orb"/><div className="booking__content"><div className="section-index section-index--light">05 · SEU MOMENTO</div><h2 className="split-lines">Pronta para se olhar<br/><em>de um novo jeito?</em></h2><p>Conte o que você deseja. Nossa equipe indica o profissional e o horário ideal para o seu atendimento.</p><a href="https://wa.me/5561999999999?text=Olá!%20Quero%20agendar%20um%20horário%20na%20Maison%20Auréa." className="booking__button" target="_blank" rel="noreferrer"><span>Agendar pelo WhatsApp</span><b>↗</b></a></div><div className="booking__meta"><span>SEG—SÁB · 09H ÀS 20H</span><span>BRASÍLIA · DF</span></div></section>
    </main>

    <footer className="footer"><a className="footer__brand" href="#inicio"><span>MAISON</span><em>Auréa</em></a><div className="footer__columns"><div><span>NAVEGUE</span><a href="#experiencia">A experiência</a><a href="#servicos">Serviços</a><a href="#metodo">Nosso método</a></div><div><span>VISITE</span><a href="#agendar">SHIS QI 11 · Lago Sul<br/>Brasília · DF</a></div><div><span>ACOMPANHE</span><a href="#instagram">Instagram ↗</a><a href="#pinterest">Pinterest ↗</a></div></div><div className="footer__bottom"><span>© 2026 MAISON AURÉA</span><span>BELEZA COM INTENÇÃO</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
  </>
}

export default App
