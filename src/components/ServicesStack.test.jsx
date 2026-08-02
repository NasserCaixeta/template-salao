import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import ServicesStack from './ServicesStack'

it('renders the four approved salon services in order', () => {
  render(<ServicesStack />)
  expect(screen.getAllByTestId('service-card').map(card => card.dataset.title)).toEqual([
    'Cortes autorais', 'Cor & iluminação', 'Tratamentos', 'Noivas & eventos',
  ])
  const video = screen.getByLabelText('Cabelo loiro longo e brilhante sendo exibido dentro do salão')
  expect(video.tagName).toBe('VIDEO')
  expect(video).toHaveAttribute('poster', '/media/service-shine-poster.jpg')
  expect(screen.getAllByTestId('service-card')[1]).toContainElement(video)
})

it('uses the video poster as a static image when reduced motion is enabled', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }))
  render(<ServicesStack />)
  const poster = screen.getByAltText('Cabelo loiro longo e brilhante sendo exibido dentro do salão')
  expect(poster.tagName).toBe('IMG')
  expect(poster).toHaveAttribute('src', '/media/service-shine-poster.jpg')
  expect(document.querySelectorAll('video')).toHaveLength(0)
  vi.unstubAllGlobals()
})
