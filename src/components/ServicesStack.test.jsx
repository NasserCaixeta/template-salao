import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import ServicesStack from './ServicesStack'

it('renders the four approved salon services in order', () => {
  render(<ServicesStack />)
  expect(screen.getAllByTestId('service-card').map(card => card.dataset.title)).toEqual([
    'Cortes autorais', 'Cor & iluminação', 'Tratamentos', 'Noivas & eventos',
  ])
})
