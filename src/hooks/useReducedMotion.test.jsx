import { renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useReducedMotion } from './useReducedMotion'

it('reports the operating-system reduced-motion preference', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }))
  expect(renderHook(() => useReducedMotion()).result.current).toBe(true)
  vi.unstubAllGlobals()
})
