import { story } from '../content/siteContent'

export default function Story() {
  return <section className="story" id="historias">
    <img src={story.media} alt="Resultado de cabelo da cliente Maison Auréa" loading="lazy" />
    <div className="story__shade" aria-hidden="true" />
    <div className="story__heading"><span>{story.eyebrow}</span><h2>{story.title}</h2></div>
    <blockquote><p>“{story.quote}”</p><footer>{story.author}</footer></blockquote>
  </section>
}
