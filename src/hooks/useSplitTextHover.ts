import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function useSplitTextHover(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const stacks = el.querySelectorAll<HTMLElement>('.letter-stack')
    if (!stacks.length) return

    const onEnter = () => {
      gsap.killTweensOf(stacks)
      gsap.to(stacks, {
        yPercent: -50,
        duration: 0.45,
        stagger: 0.028,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.killTweensOf(stacks)
      gsap.to(stacks, {
        yPercent: 0,
        duration: 0.4,
        stagger: 0.022,
        ease: 'power3.inOut',
      })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(stacks)
    }
  }, [ref])
}
