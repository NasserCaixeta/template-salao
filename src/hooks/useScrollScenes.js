import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useScrollScenes(scope, build) {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !scope.current) return undefined
    const context = gsap.context(() => build({ gsap, ScrollTrigger }), scope)
    return () => context.revert()
  }, [scope, build, reduced])
}
