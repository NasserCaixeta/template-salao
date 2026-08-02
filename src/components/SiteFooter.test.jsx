import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter'

it('closes with one primary WhatsApp action and useful salon details', () => {
  render(<SiteFooter />)
  expect(screen.getByRole('heading', { name: /se olhar de um novo jeito/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /agendar pelo whatsapp/i })).toHaveAttribute('target', '_blank')
  expect(screen.getByText(/seg—sáb/i)).toBeInTheDocument()
})
