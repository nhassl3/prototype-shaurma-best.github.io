import type { RefObject } from 'react'
import { useEffect } from 'react'

/** Scroll reveal for `.reveal` blocks **/
export function useSiteEffects(
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let io: IntersectionObserver | undefined

    // hide only what is below the fold, show on entry
    if (!reduce && 'IntersectionObserver' in window) {
      const vh = window.innerHeight || 800
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.remove('pre')
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
      io = observer
      root.querySelectorAll('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top > vh) {
          el.classList.add('pre')
          observer.observe(el)
        }
      })
    }

    const cleanups: (() => void)[] = [() => io?.disconnect()]

    return () => cleanups.forEach((fn) => fn())
  }, [rootRef])
}
