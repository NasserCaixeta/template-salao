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
