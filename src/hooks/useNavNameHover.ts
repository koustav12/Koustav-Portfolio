import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function useNavNameHover(
  linkRef: RefObject<HTMLAnchorElement | null>,
  dotRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const link = linkRef.current
    const dot = dotRef.current
    if (!link || !dot) return

    const letters = link.querySelectorAll<HTMLElement>('.gsap_split_letter')
    let waveTimeline: gsap.core.Timeline | null = null

    const onEnter = () => {
      gsap.killTweensOf([...letters, dot])
      waveTimeline?.kill()

      gsap.to(dot, {
        y: -11,
        duration: 0.38,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(dot, {
            y: 0,
            duration: 0.85,
            ease: 'bounce.out',
          })
        },
      })

      waveTimeline = gsap
        .timeline()
        .to(letters, {
          y: -8,
          duration: 0.42,
          stagger: {
            each: 0.034,
            from: 'start',
            ease: 'sine.inOut',
          },
          ease: 'sine.out',
        })
        .to(
          letters,
          {
            y: 0,
            duration: 0.55,
            stagger: {
              each: 0.03,
              from: 'start',
              ease: 'sine.inOut',
            },
            ease: 'sine.inOut',
          },
          '-=0.12',
        )
    }

    const onLeave = () => {
      waveTimeline?.kill()
      waveTimeline = null
      gsap.killTweensOf([...letters, dot])
      gsap.to(letters, {
        y: 0,
        duration: 0.4,
        stagger: { each: 0.022, from: 'end', ease: 'sine.inOut' },
        ease: 'sine.out',
      })
      gsap.to(dot, { y: 0, duration: 0.3, ease: 'sine.out' })
    }

    link.addEventListener('mouseenter', onEnter)
    link.addEventListener('mouseleave', onLeave)

    return () => {
      link.removeEventListener('mouseenter', onEnter)
      link.removeEventListener('mouseleave', onLeave)
      waveTimeline?.kill()
      gsap.killTweensOf([...letters, dot])
    }
  }, [linkRef, dotRef])
}
