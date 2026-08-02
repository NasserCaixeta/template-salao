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
