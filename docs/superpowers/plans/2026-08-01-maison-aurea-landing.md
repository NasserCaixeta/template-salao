# Maison Auréa Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Maison Auréa React + Vite landing page as a cinematic, salon-specific experience with a full-screen hero, persistent header, two scroll-driven card sequences, responsive adaptations, and WhatsApp conversion.

**Architecture:** The page is decomposed into focused section components fed by a single content module. GSAP and ScrollTrigger own desktop scroll choreography; CSS owns layout, hover states, and no-JavaScript fallbacks. Vitest covers content and component contracts, while Playwright verifies full-page behavior, responsive states, and reduced motion.

**Tech Stack:** React 19, Vite 7, GSAP 3 with ScrollTrigger, CSS custom properties, Vitest, Testing Library, Playwright.

---

## File structure

- `src/App.jsx` — composes the page and owns mobile-menu state only.
- `src/content/siteContent.js` — brand, navigation, services, method steps, story, contact, and media paths.
- `src/hooks/useReducedMotion.js` — reactive reduced-motion preference.
- `src/hooks/useScrollScenes.js` — GSAP registration, contexts, and cleanup.
- `src/components/Header.jsx` — persistent desktop/mobile navigation.
- `src/components/Opening.jsx` — automatic introductory mask.
- `src/components/Hero.jsx` — full-screen video hero and fallback poster.
- `src/components/ServicesStack.jsx` — light sticky service-card sequence.
- `src/components/MethodStack.jsx` — dark sticky method-card sequence.
- `src/components/Story.jsx` — full-screen client/result story.
- `src/components/SiteFooter.jsx` — final CTA and footer navigation.
- `src/styles/base.css` — tokens, reset, type, common controls, and accessibility.
- `src/styles/header.css` — header, mobile menu, and header microinteractions.
- `src/styles/hero.css` — opening and hero presentation.
- `src/styles/stacks.css` — services and method sticky layouts.
- `src/styles/story-footer.css` — story, CTA, and footer.
- `src/styles/responsive.css` — tablet, mobile, touch, and reduced-motion overrides.
- `src/test/setup.js` — DOM test setup.
- `src/**/*.test.jsx` — component and content contract tests.
- `tests/e2e/landing.spec.js` — browser-level interaction and responsive tests.
- `public/media/*` — optimized local salon images, poster, and muted hero video.

### Task 1: Pin the toolchain and establish the test harness

**Files:**
- Modify: `package.json`
- Modify: `src/main.jsx`
- Create: `vite.config.js`
- Create: `src/test/setup.js`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Replace the unpinned package manifest**

```json
{
  "name": "maison-aurea",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@vitejs/plugin-react": "4.3.4",
    "gsap": "3.12.7",
    "vite": "6.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@playwright/test": "1.50.1",
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.2.0",
    "jsdom": "26.0.0",
    "vitest": "3.0.5"
  }
}
```

- [ ] **Step 2: Add Vite/Vitest configuration and DOM setup**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.js' },
})
```

```js
// src/test/setup.js
import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
```

- [ ] **Step 3: Write the initial failing render test**

```jsx
// src/App.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Maison Auréa landing page', () => {
  it('renders the brand, primary heading, and booking action', () => {
    render(<App />)
    expect(screen.getByText('MAISON AURÉA')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Seu brilho')
    expect(screen.getAllByRole('link', { name: /agendar/i }).length).toBeGreaterThan(1)
  })
})
```

- [ ] **Step 4: Install dependencies and verify the test fails for the current UI contract**

Run: `npm install && npm test`  
Expected: FAIL because the current split brand does not expose the exact accessible text `MAISON AURÉA`.

- [ ] **Step 5: Keep `src/main.jsx` minimal and import the new style entrypoints**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/base.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/stacks.css'
import './styles/story-footer.css'
import './styles/responsive.css'

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
```

- [ ] **Step 6: Commit the harness**

```bash
git add package.json package-lock.json vite.config.js src/main.jsx src/test/setup.js src/App.test.jsx
git commit -m "test: establish Maison Aurea frontend harness"
```

### Task 2: Centralize approved content and acquire coherent salon media

**Files:**
- Create: `src/content/siteContent.js`
- Create: `src/content/siteContent.test.js`
- Create: `public/media/README.md`
- Create: `public/media/hero-poster.jpg`
- Create: `public/media/service-cut.jpg`
- Create: `public/media/service-color.jpg`
- Create: `public/media/service-treatment.jpg`
- Create: `public/media/service-event.jpg`
- Create: `public/media/method-diagnosis.jpg`
- Create: `public/media/method-creation.jpg`
- Create: `public/media/method-finish.jpg`
- Create: `public/media/story-result.jpg`
- Create: `public/media/hero-salon.mp4`

- [ ] **Step 1: Write the failing content contract test**

```js
import { describe, expect, it } from 'vitest'
import { methodSteps, services, site } from './siteContent'

describe('approved salon content', () => {
  it('contains only the approved navigation and booking destination', () => {
    expect(site.navigation.map(({ label }) => label)).toEqual(['Serviços', 'Método', 'Histórias'])
    expect(site.whatsapp).toMatch(/^https:\/\/wa\.me\//)
    expect(JSON.stringify(site)).not.toMatch(/som|áudio|sound|\bW\b/i)
  })

  it('defines four services and three method steps with local salon media', () => {
    expect(services).toHaveLength(4)
    expect(methodSteps).toHaveLength(3)
    ;[...services, ...methodSteps].forEach(item => expect(item.media).toMatch(/^\/media\//))
  })
})
```

- [ ] **Step 2: Run the content test and confirm the module is missing**

Run: `npm test -- src/content/siteContent.test.js`  
Expected: FAIL with `Failed to resolve import "./siteContent"`.

- [ ] **Step 3: Add the complete content model**

```js
export const site = {
  brand: 'MAISON AURÉA',
  navigation: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Método', href: '#metodo' },
    { label: 'Histórias', href: '#historias' },
  ],
  whatsapp: 'https://wa.me/5561999999999?text=Olá!%20Quero%20agendar%20uma%20experiência%20na%20Maison%20Auréa.',
}

export const services = [
  { number: '01', title: 'Cortes autorais', copy: 'Forma, textura e movimento desenhados para o seu rosto e a sua rotina.', media: '/media/service-cut.jpg' },
  { number: '02', title: 'Cor & iluminação', copy: 'Tons sofisticados e transições luminosas com profundidade e saúde.', media: '/media/service-color.jpg' },
  { number: '03', title: 'Tratamentos', copy: 'Protocolos de reconstrução e nutrição escolhidos depois do diagnóstico.', media: '/media/service-treatment.jpg' },
  { number: '04', title: 'Noivas & eventos', copy: 'Beleza completa construída em harmonia com o seu momento.', media: '/media/service-event.jpg' },
]

export const methodSteps = [
  { number: '01', title: 'Escuta & diagnóstico', copy: 'Entendemos textura, rotina, referências e o que você deseja sentir.', media: '/media/method-diagnosis.jpg' },
  { number: '02', title: 'Criação sob medida', copy: 'Técnica, cor e tratamento se combinam sem fórmulas automáticas.', media: '/media/method-creation.jpg' },
  { number: '03', title: 'Finalização & continuidade', copy: 'Você sai com resultado e orientação para preservá-lo em casa.', media: '/media/method-finish.jpg' },
]

export const story = {
  eyebrow: 'Uma história, um resultado',
  title: 'Quando alguém entende seu cabelo antes de tentar mudá-lo.',
  quote: 'Foi a primeira vez que o resultado continuou parecendo meu — só que mais preciso.',
  author: 'Marina A. · Cor, corte e tratamento',
  media: '/media/story-result.jpg',
}
```

- [ ] **Step 4: Download and optimize the approved salon-only media**

Use the exact Unsplash salon photographs below as local source material and the Pexels video “Woman Getting Hair Styled at Salon” by Jabeer Alhassan as the muted hero source. Convert images to progressive JPEG, maximum 2000 px on the long edge and quality 82; transcode video to H.264, muted, 1920 px maximum width, `faststart`, and 12–18 seconds.

Run:

```bash
mkdir -p public/media
curl -L 'https://unsplash.com/photos/lK8oXGycy88/download?force=true&w=2200' -o public/media/hero-poster.jpg
curl -L 'https://unsplash.com/photos/cr-W6vkRfug/download?force=true&w=1800' -o public/media/service-cut.jpg
curl -L 'https://unsplash.com/photos/EQ-xqqn3Rfg/download?force=true&w=1800' -o public/media/service-color.jpg
curl -L 'https://unsplash.com/photos/lK8oXGycy88/download?force=true&w=1800' -o public/media/service-treatment.jpg
curl -L 'https://unsplash.com/photos/bDqzUic9Y68/download?force=true&w=1800' -o public/media/service-event.jpg
cp public/media/service-cut.jpg public/media/method-diagnosis.jpg
cp public/media/service-color.jpg public/media/method-creation.jpg
cp public/media/service-event.jpg public/media/method-finish.jpg
cp public/media/service-color.jpg public/media/story-result.jpg
python3 -m pip install --user yt-dlp
python3 -m yt_dlp -f 'best[ext=mp4]' -o hero-salon-source.mp4 'https://www.pexels.com/video/woman-getting-hair-styled-at-salon-29971675/'
ffmpeg -i hero-salon-source.mp4 -an -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 24 -movflags +faststart -t 18 public/media/hero-salon.mp4
```

Expected: `file public/media/*` reports JPEG images and an H.264 MP4; every visible asset depicts salon work. `hero-salon-source.mp4` is a temporary licensed download from the documented Pexels source page and is not committed.

Create the attribution record with this exact content:

```md
# Media sources

- Hero video: “Woman Getting Hair Styled at Salon”, Jabeer Alhassan — https://www.pexels.com/video/woman-getting-hair-styled-at-salon-29971675/
- Salon interior / poster: https://unsplash.com/photos/lK8oXGycy88
- Stylist at work: https://unsplash.com/photos/cr-W6vkRfug
- Warm salon portrait: https://unsplash.com/photos/EQ-xqqn3Rfg
- Event hairstyle: https://unsplash.com/photos/bDqzUic9Y68

Downloaded under the Pexels and Unsplash licenses current on 2026-08-01. Files are cropped and compressed for this presentation.
```

- [ ] **Step 5: Run the contract test**

Run: `npm test -- src/content/siteContent.test.js`  
Expected: PASS, 2 tests.

- [ ] **Step 6: Commit content and media attribution**

```bash
git add src/content public/media
git commit -m "feat: add salon content and licensed media"
```

### Task 3: Build the accessible shell, automatic opening, and faithful header

**Files:**
- Replace: `src/App.jsx`
- Create: `src/components/Opening.jsx`
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.test.jsx`
- Create: `src/hooks/useReducedMotion.js`
- Create: `src/styles/base.css`
- Create: `src/styles/header.css`

- [ ] **Step 1: Write failing header behavior tests**

```jsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('has only the approved nav links and WhatsApp CTA', () => {
    render(<Header menuOpen={false} onMenuToggle={() => {}} />)
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
    expect(screen.queryByLabelText(/som/i)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /agendar/i })).toHaveAttribute('href', expect.stringMatching(/^https:\/\/wa\.me/))
  })

  it('opens the mobile menu from an explicit button', () => {
    const onMenuToggle = vi.fn()
    render(<Header menuOpen={false} onMenuToggle={onMenuToggle} />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    expect(onMenuToggle).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run the test to verify the component is absent**

Run: `npm test -- src/components/Header.test.jsx`  
Expected: FAIL with unresolved `./Header`.

- [ ] **Step 3: Implement the reduced-motion hook and automatic opening**

```js
// src/hooks/useReducedMotion.js
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => matchMedia(query).matches)
  useEffect(() => {
    const media = matchMedia(query)
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduced
}
```

```jsx
// src/components/Opening.jsx
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Opening() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduced ? 120 : 1450)
    return () => clearTimeout(timer)
  }, [reduced])
  return visible ? <div className="opening" aria-hidden="true"><span>MAISON AURÉA</span></div> : null
}
```

- [ ] **Step 4: Implement the three-column header and mobile menu**

```jsx
import { site } from '../content/siteContent'

export default function Header({ menuOpen, onMenuToggle }) {
  return <>
    <header className="site-header">
      <a className="site-header__brand" href="#inicio" aria-label="Maison Auréa — início">{site.brand}</a>
      <nav className="site-header__nav" aria-label="Principal">
        {site.navigation.map(link => <a href={link.href} key={link.href}><span>{link.label}</span><span aria-hidden="true">{link.label}</span></a>)}
      </nav>
      <div className="site-header__actions">
        <a className="header-cta" href={site.whatsapp} target="_blank" rel="noreferrer"><span>Agendar</span><b>↗</b></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={onMenuToggle}><i/><i/></button>
      </div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <nav aria-label="Menu móvel">{site.navigation.map(link => <a href={link.href} key={link.href} onClick={onMenuToggle}>{link.label}</a>)}</nav>
    </div>
  </>
}
```

- [ ] **Step 5: Replace `App.jsx` with the section composition**

```jsx
import { useState } from 'react'
import Header from './components/Header'
import Opening from './components/Opening'
import Hero from './components/Hero'
import ServicesStack from './components/ServicesStack'
import MethodStack from './components/MethodStack'
import Story from './components/Story'
import SiteFooter from './components/SiteFooter'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <Opening />
    <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(value => !value)} />
    <main><Hero /><ServicesStack /><MethodStack /><Story /></main>
    <SiteFooter />
  </>
}
```

- [ ] **Step 6: Add base and header styling**

Implement tokens from the design spec, a one-pixel framed header at `18px 18px auto`, three equal desktop columns, rolling duplicate nav labels on hover, arrow translation on CTA hover, a compact state selected by `.is-compact`, focus-visible outlines, body lock while the menu is open, and a full-screen mobile menu. Use `DM Sans` and `Italiana` through self-hosted or Google Fonts imports.

Run: `npm test -- src/components/Header.test.jsx src/App.test.jsx`  
Expected: PASS.

- [ ] **Step 7: Commit the shell**

```bash
git add src/App.jsx src/components/Opening.jsx src/components/Header.jsx src/components/Header.test.jsx src/hooks/useReducedMotion.js src/styles/base.css src/styles/header.css
git commit -m "feat: add cinematic shell and persistent header"
```

### Task 4: Implement the full-bleed hero and header compaction

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/Hero.test.jsx`
- Create: `src/hooks/useScrollScenes.js`
- Create: `src/styles/hero.css`
- Modify: `src/components/Header.jsx`

- [ ] **Step 1: Write the failing hero contract test**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Hero from './Hero'

it('renders a full-screen muted salon video with poster and booking CTA', () => {
  render(<Hero />)
  const video = screen.getByLabelText('Atendimento no salão Maison Auréa')
  expect(video).toHaveAttribute('src', '/media/hero-salon.mp4')
  expect(video).toHaveAttribute('poster', '/media/hero-poster.jpg')
  expect(video).toHaveProperty('muted', true)
  expect(screen.getByRole('link', { name: /agendar sua experiência/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/Hero.test.jsx`  
Expected: FAIL because `Hero.jsx` does not exist.

- [ ] **Step 3: Implement the hero**

```jsx
import { site } from '../content/siteContent'

export default function Hero() {
  return <section className="hero" id="inicio">
    <video className="hero__media" src="/media/hero-salon.mp4" poster="/media/hero-poster.jpg" autoPlay muted loop playsInline aria-label="Atendimento no salão Maison Auréa" />
    <div className="hero__shade" aria-hidden="true" />
    <div className="hero__copy">
      <p>Beleza autoral · cuidado preciso</p>
      <h1>Seu brilho,<br/><em>em primeiro plano.</em></h1>
      <a href={site.whatsapp} target="_blank" rel="noreferrer">Agendar sua experiência <span>↗</span></a>
    </div>
    <span className="hero__scroll">Role para descobrir ↓</span>
  </section>
}
```

- [ ] **Step 4: Add the shared scroll lifecycle**

```js
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useScrollScenes(scope, build) {
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced) return undefined
    const context = gsap.context(() => build({ gsap, ScrollTrigger }), scope)
    return () => context.revert()
  }, [scope, build, reduced])
}
```

- [ ] **Step 5: Style and animate the hero transition**

Set `.hero` to `min-height: 100svh`, inset it by 18 px, give it the approved rounded one-pixel frame, and make `.hero__media` `width/height:100%; object-fit:cover`. Create a scroll timeline that rounds and translates the incoming services panel over the hero; toggle `.is-compact` on `.site-header` after 70% of the hero height. Keep the headline anchored rather than revealing every word.

Run: `npm test -- src/components/Hero.test.jsx`  
Expected: PASS.

- [ ] **Step 6: Commit the hero**

```bash
git add src/components/Hero.jsx src/components/Hero.test.jsx src/components/Header.jsx src/hooks/useScrollScenes.js src/styles/hero.css
git commit -m "feat: add full-bleed salon hero"
```

### Task 5: Implement the sticky service-card sequence

**Files:**
- Create: `src/components/ServicesStack.jsx`
- Create: `src/components/ServicesStack.test.jsx`
- Create: `src/styles/stacks.css`

- [ ] **Step 1: Write the failing service-card test**

```jsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import ServicesStack from './ServicesStack'

it('renders the four approved salon services in order', () => {
  render(<ServicesStack />)
  expect(screen.getAllByTestId('service-card').map(card => card.dataset.title)).toEqual([
    'Cortes autorais', 'Cor & iluminação', 'Tratamentos', 'Noivas & eventos',
  ])
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/ServicesStack.test.jsx`  
Expected: FAIL because the component is missing.

- [ ] **Step 3: Implement semantic service cards and GSAP stacking**

```jsx
import { useCallback, useRef } from 'react'
import { services } from '../content/siteContent'
import { useScrollScenes } from '../hooks/useScrollScenes'

export default function ServicesStack() {
  const scope = useRef(null)
  const build = useCallback(({ gsap }) => {
    const cards = gsap.utils.toArray('.service-card')
    cards.forEach((card, index) => gsap.fromTo(card,
      { yPercent: 108, rotate: index % 2 ? 3 : -3 },
      { yPercent: 0, rotate: index % 2 ? 1 : -1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 20%', scrub: true } }
    ))
  }, [])
  useScrollScenes(scope, build)
  return <section className="services-stack" id="servicos" ref={scope}>
    <div className="services-stack__sticky">
      <div className="services-stack__intro"><span>01 · Serviços</span><h2>Técnica para transformar.<br/><em>Sensibilidade para preservar.</em></h2></div>
      <div className="services-stack__cards">{services.map(service => <article className="service-card" data-testid="service-card" data-title={service.title} key={service.title}>
        <div><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p></div>
        <img src={service.media} alt={`Atendimento de ${service.title.toLowerCase()} na Maison Auréa`} loading="lazy" />
      </article>)}</div>
    </div>
  </section>
}
```

- [ ] **Step 4: Style the desktop stack and normal-flow mobile list**

Desktop: give the section approximately `500vh`, make the inner panel `position: sticky; top: 0; height: 100svh`, reserve the left 42% for the manifesto, and absolutely overlap cards in the right 52%. Mobile: restore `height:auto`, `position:relative`, and normal document flow; remove card rotation and overlap.

Run: `npm test -- src/components/ServicesStack.test.jsx`  
Expected: PASS.

- [ ] **Step 5: Commit the services sequence**

```bash
git add src/components/ServicesStack.jsx src/components/ServicesStack.test.jsx src/styles/stacks.css
git commit -m "feat: add sticky salon services sequence"
```

### Task 6: Implement the dark method-card sequence

**Files:**
- Create: `src/components/MethodStack.jsx`
- Create: `src/components/MethodStack.test.jsx`
- Modify: `src/styles/stacks.css`

- [ ] **Step 1: Write the failing method test**

```jsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import MethodStack from './MethodStack'

it('renders three numbered method steps with contextual images', () => {
  render(<MethodStack />)
  expect(screen.getAllByTestId('method-card')).toHaveLength(3)
  expect(screen.getByRole('heading', { name: 'Escuta & diagnóstico' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Finalização & continuidade' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/MethodStack.test.jsx`  
Expected: FAIL because `MethodStack.jsx` is absent.

- [ ] **Step 3: Implement the method stack**

```jsx
import { useCallback, useRef } from 'react'
import { methodSteps } from '../content/siteContent'
import { useScrollScenes } from '../hooks/useScrollScenes'

export default function MethodStack() {
  const scope = useRef(null)
  const build = useCallback(({ gsap }) => {
    gsap.utils.toArray('.method-card').forEach((card, index) => gsap.fromTo(card,
      { yPercent: 105 },
      { yPercent: index * 2, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 12%', scrub: true } }
    ))
  }, [])
  useScrollScenes(scope, build)
  return <section className="method-stack" id="metodo" ref={scope}>
    <header><span>02 · Método</span><h2>Um ritual simples.<br/><em>Um resultado único.</em></h2><p>Do primeiro diagnóstico à rotina em casa, cada decisão tem uma razão.</p></header>
    <div className="method-stack__cards">{methodSteps.map(step => <article className="method-card" data-testid="method-card" key={step.title}>
      <div className="method-card__copy"><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></div>
      <img src={step.media} alt={`Etapa ${step.number}: ${step.title}`} loading="lazy" />
    </article>)}</div>
  </section>
}
```

- [ ] **Step 4: Style sticky desktop cards and vertical mobile cards**

Desktop cards are near-viewport width, two-column, one-pixel outlined, and sticky at incrementing top offsets so the following card covers the previous. Mobile cards use image-first order, a portrait aspect ratio, full-width text below, and only a small sticky offset/rotation where viewport height is at least 700 px.

Run: `npm test -- src/components/MethodStack.test.jsx`  
Expected: PASS.

- [ ] **Step 5: Commit the method sequence**

```bash
git add src/components/MethodStack.jsx src/components/MethodStack.test.jsx src/styles/stacks.css
git commit -m "feat: add scroll-driven method sequence"
```

### Task 7: Add the full-screen story, conversion close, and footer

**Files:**
- Create: `src/components/Story.jsx`
- Create: `src/components/SiteFooter.jsx`
- Create: `src/components/SiteFooter.test.jsx`
- Create: `src/styles/story-footer.css`

- [ ] **Step 1: Write the failing conversion test**

```jsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter'

it('closes with one primary WhatsApp action and useful salon details', () => {
  render(<SiteFooter />)
  expect(screen.getByRole('heading', { name: /se olhar de um novo jeito/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /agendar pelo whatsapp/i })).toHaveAttribute('target', '_blank')
  expect(screen.getByText(/seg—sáb/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/SiteFooter.test.jsx`  
Expected: FAIL because `SiteFooter.jsx` is absent.

- [ ] **Step 3: Implement the full-screen story**

```jsx
import { story } from '../content/siteContent'

export default function Story() {
  return <section className="story" id="historias">
    <img src={story.media} alt="Resultado de cabelo da cliente Maison Auréa" loading="lazy" />
    <div className="story__shade" aria-hidden="true" />
    <div className="story__heading"><span>{story.eyebrow}</span><h2>{story.title}</h2></div>
    <blockquote><p>“{story.quote}”</p><footer>{story.author}</footer></blockquote>
  </section>
}
```

- [ ] **Step 4: Implement CTA and footer without decorative orb**

```jsx
import { site } from '../content/siteContent'

export default function SiteFooter() {
  return <footer className="site-footer">
    <section className="final-cta">
      <span>03 · Seu momento</span>
      <h2>Pronta para se olhar<br/><em>de um novo jeito?</em></h2>
      <a href={site.whatsapp} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <b>↗</b></a>
    </section>
    <div className="footer-nav">
      <p>Beleza com intenção, técnica e tempo para você.</p>
      <nav aria-label="Rodapé">{site.navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <address>SHIS QI 11 · Lago Sul<br/>Brasília · DF<br/>Seg—Sáb · 09h às 20h</address>
    </div>
    <div className="footer-legal"><span>© 2026 MAISON AURÉA</span><a href="#inicio">Voltar ao topo ↑</a></div>
  </footer>
}
```

- [ ] **Step 5: Style the story fade and continuous dark ending**

Make `.story` at least `120svh` with full-bleed media and overlay copy. Drive the lower gradient from transparent to `--ink` so it visually merges with `.site-footer`. Use a large editorial footer navigation and no sphere, audio control, floating WhatsApp tile, or unrelated ornament.

Run: `npm test -- src/components/SiteFooter.test.jsx src/App.test.jsx`  
Expected: PASS.

- [ ] **Step 6: Commit the final sections**

```bash
git add src/components/Story.jsx src/components/SiteFooter.jsx src/components/SiteFooter.test.jsx src/styles/story-footer.css
git commit -m "feat: add salon story and booking close"
```

### Task 8: Complete responsive, reduced-motion, and interaction behavior

**Files:**
- Create: `src/styles/responsive.css`
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Create: `src/hooks/useReducedMotion.test.jsx`

- [ ] **Step 1: Write a reduced-motion hook test**

```jsx
import { renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useReducedMotion } from './useReducedMotion'

it('reports the operating-system reduced-motion preference', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }))
  expect(renderHook(() => useReducedMotion()).result.current).toBe(true)
  vi.unstubAllGlobals()
})
```

- [ ] **Step 2: Run the hook test and confirm behavior**

Run: `npm test -- src/hooks/useReducedMotion.test.jsx`  
Expected: PASS. If it fails due to initialization, make the initializer read `window.matchMedia(query).matches` directly.

- [ ] **Step 3: Add responsive and reduced-motion CSS**

At `max-width: 760px`: use 13 px page insets, hide desktop nav, show menu button, keep hero at `100svh`, switch services to a non-overlapping list, switch method cards to image-first columns, and scale headings with `clamp()`. At `(hover: none)`, disable hover-only translations. Under `prefers-reduced-motion: reduce`, set `scroll-behavior:auto`, remove transitions/transforms, keep all cards visible in normal flow, and stop hero video animation where the browser permits.

- [ ] **Step 4: Lock background and restore focus for the mobile menu**

In `App.jsx`, add an effect that sets `document.body.dataset.menuOpen = menuOpen ? 'true' : 'false'` and cleans it up. In `Header.jsx`, focus the first mobile menu link when opening and return focus to the menu button when closing. The Escape key must close the menu.

- [ ] **Step 5: Run all unit tests and production build**

Run: `npm test && npm run build`  
Expected: all tests PASS; Vite exits 0 and creates `dist/` without unresolved media imports.

- [ ] **Step 6: Commit responsive and accessibility behavior**

```bash
git add src/App.jsx src/components/Header.jsx src/hooks/useReducedMotion.test.jsx src/styles/responsive.css
git commit -m "feat: add responsive and reduced-motion behavior"
```

### Task 9: Verify cinematic behavior in real browsers

**Files:**
- Create: `playwright.config.js`
- Create: `tests/e2e/landing.spec.js`
- Create: `.gitignore`
- Remove: `script.js`
- Remove: obsolete root `styles.css`

- [ ] **Step 1: Add Playwright configuration**

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'on-first-retry' },
  webServer: { command: 'npm run build && npm run preview -- --host 127.0.0.1', port: 4173, reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
})
```

- [ ] **Step 2: Write end-to-end behavior tests**

```js
import { expect, test } from '@playwright/test'

test('desktop preserves the cinematic sequence and persistent header', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero')).toBeVisible()
  await expect(page.locator('.hero__media')).toHaveCSS('object-fit', 'cover')
  await page.locator('#servicos').scrollIntoViewIfNeeded()
  await expect(page.locator('.site-header')).toBeVisible()
  await expect(page.getByTestId('service-card')).toHaveCount(4)
  await page.locator('#metodo').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('method-card')).toHaveCount(3)
})

test('mobile uses vertical services and an operable menu', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible()
  await page.getByRole('button', { name: 'Fechar menu' }).press('Escape')
  await page.locator('#servicos').scrollIntoViewIfNeeded()
  const first = page.getByTestId('service-card').first()
  expect(await first.evaluate(el => getComputedStyle(el).position)).toBe('relative')
})

test('reduced motion keeps all content available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByTestId('service-card')).toHaveCount(4)
  await expect(page.getByTestId('method-card')).toHaveCount(3)
})
```

- [ ] **Step 3: Ignore generated files and delete obsolete static implementation**

```gitignore
node_modules/
dist/
test-results/
playwright-report/
.DS_Store
.superpowers/
```

Remove `script.js` and the obsolete root `styles.css` only after the new imports build successfully. Keep `design.md` as historical input and the approved spec under `docs/plans/`.

- [ ] **Step 4: Run browser tests**

Run: `npx playwright install chromium && npm run test:e2e`  
Expected: 6 tests PASS across desktop and mobile projects.

- [ ] **Step 5: Capture visual validation frames**

Run:

```bash
npx playwright screenshot --viewport-size=1440,900 --full-page http://127.0.0.1:4173 test-results/maison-desktop.png
npx playwright screenshot --device='iPhone 13' --full-page http://127.0.0.1:4173 test-results/maison-mobile.png
```

Inspect both captures against the approved motion blueprint: full-bleed salon hero, compact header, four service cards, three method cards, full-screen story, uninterrupted dark close, and no sound/W controls.

- [ ] **Step 6: Run final checks and commit cleanup**

Run: `npm test && npm run build && npm run test:e2e`  
Expected: all unit tests, production build, and all browser tests pass.

```bash
git add .gitignore playwright.config.js tests/e2e index.html src public package.json package-lock.json
git add -u script.js styles.css
git commit -m "test: validate Maison Aurea experience end to end"
```

## Self-review result

- Spec coverage: opening, hero, header, service stack, method stack, story, CTA/footer, salon-only media, mobile adaptation, WhatsApp, reduced motion, accessibility, and performance all map to explicit tasks.
- Placeholder scan: no `TBD`, deferred implementation, or unspecified tests remain. Media acquisition names exact files, source identifiers, transforms, and validation.
- Type consistency: `site.navigation`, `site.whatsapp`, `services`, `methodSteps`, and `story` use the same property names across components and tests; all hash targets match rendered section IDs.
