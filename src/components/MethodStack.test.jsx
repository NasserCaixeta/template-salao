import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import MethodStack from './MethodStack'

it('renders three numbered method steps with contextual images', () => {
  render(<MethodStack />)
  expect(screen.getAllByTestId('method-card')).toHaveLength(3)
  expect(screen.getByRole('heading', { name: 'Escuta & diagnóstico' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Finalização & continuidade' })).toBeInTheDocument()
})
