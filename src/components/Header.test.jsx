import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
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
