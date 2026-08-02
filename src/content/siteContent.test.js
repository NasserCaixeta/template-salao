import { describe, expect, it } from 'vitest'
import { methodSteps, services, site } from './siteContent'

describe('approved salon content', () => {
  it('contains only the approved navigation and booking destination', () => {
    expect(site.navigation.map(({ label }) => label)).toEqual(['Serviços', 'Método', 'Histórias'])
    expect(site.whatsapp).toMatch(/^https:\/\/wa\.me\//)
    expect(JSON.stringify(site)).not.toMatch(/som|áudio|sound|\bW\b/i)
  })

  it('defines four distinct salon services with the video in second position', () => {
    expect(services).toHaveLength(4)
    expect(methodSteps).toHaveLength(3)
    ;[...services, ...methodSteps].forEach(item => expect(item.media).toMatch(/^\/media\//))
    expect(services.map(({ type }) => type)).toEqual(['image', 'video', 'image', 'image'])
    expect(services[1].poster).toMatch(/^\/media\/.+\.jpg$/)
    expect(new Set(services.map(({ media }) => media))).toHaveLength(4)
  })
})
