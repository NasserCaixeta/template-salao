import { methodSteps } from '../content/siteContent'

export default function MethodStack() {
  return <section className="method-stack" id="metodo">
    <header><span>02 · Método</span><h2>Um ritual simples.<br/><em>Um resultado único.</em></h2><p>Do primeiro diagnóstico à rotina em casa, cada decisão tem uma razão.</p></header>
    <div className="method-stack__cards">{methodSteps.map((step, index) => <article className={`method-card method-card--${index + 1}`} data-testid="method-card" key={step.title}>
      <div className="method-card__copy"><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></div>
      <img src={step.media} alt={`Etapa ${step.number}: ${step.title}`} loading="lazy" />
    </article>)}</div>
  </section>
}
