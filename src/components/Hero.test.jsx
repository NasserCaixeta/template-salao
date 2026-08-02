import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders a full-screen salon sequence and booking CTA', () => {
    const { container } = render(<Hero />)
    expect(screen.getByLabelText('Atendimento no salão Maison Auréa')).toBeInTheDocument()
    expect(container.querySelectorAll('.hero__scene')).toHaveLength(3)
    expect(screen.getByLabelText('Cabelo castanho longo e brilhante sendo revelado dentro do salão')).toHaveAttribute('poster', '/media/hero-hair-reveal-poster-v3.png')
    expect(screen.getByRole('link', { name: /agendar sua experiência/i })).toBeInTheDocument()
  })
})
