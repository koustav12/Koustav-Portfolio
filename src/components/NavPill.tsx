import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import gsap from 'gsap'
import { AnimatedNavLink } from './AnimatedNavLink'
import { SplitLetters } from './SplitLetters'

type NavPillProps = {
  logo: React.ReactNode
}

export function NavPill({ logo }: NavPillProps) {
  const pillRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  const moveIndicator = useCallback((target: HTMLElement) => {
    const pill = pillRef.current
    const indicator = indicatorRef.current
    if (!pill || !indicator) return

    const pillRect = pill.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    gsap.to(indicator, {
      x: targetRect.left - pillRect.left,
      width: targetRect.width,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    const logoLink = pillRef.current?.querySelector<HTMLElement>('.nav-pill__link--logo')
    if (!logoLink) return

    const setInitial = () => {
      if (indicatorRef.current) gsap.set(indicatorRef.current, { opacity: 1 })
      moveIndicator(logoLink)
    }
    setInitial()
    window.addEventListener('resize', setInitial)

    return () => {
      window.removeEventListener('resize', setInitial)
      gsap.killTweensOf(indicatorRef.current)
    }
  }, [moveIndicator])

  const onLogoEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    moveIndicator(e.currentTarget)
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1.06, duration: 0.35, ease: 'power2.out' })
    }
  }

  const onLogoLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1, duration: 0.35, ease: 'power2.out' })
    }
  }

  const onPillLeave = () => {
    const logoLink = pillRef.current?.querySelector<HTMLElement>('.nav-pill__link--logo')
    if (logoLink) moveIndicator(logoLink)
  }

  return (
    <div className="nav-pill" ref={pillRef} onMouseLeave={onPillLeave}>
      <div className="nav-pill__indicator" ref={indicatorRef} aria-hidden="true" />
      <AnimatedNavLink
        href="/about"
        className="nav-pill__link nav-link is-peach"
        aria-label="About"
        onMouseEnter={(e) => moveIndicator(e.currentTarget)}
      >
        <SplitLetters text="About" />
      </AnimatedNavLink>
      <AnimatedNavLink
        href="/"
        aria-current="page"
        className="nav-pill__link nav-pill__link--logo w-inline-block w--current"
        onMouseEnter={onLogoEnter}
        onMouseLeave={onLogoLeave}
      >
        <div className="jm-icon" ref={iconRef}>
          {logo}
        </div>
      </AnimatedNavLink>
      <AnimatedNavLink
        href="/work"
        className="nav-pill__link nav-link is-peach"
        aria-label="Work"
        onMouseEnter={(e) => moveIndicator(e.currentTarget)}
      >
        <SplitLetters text="Work" />
      </AnimatedNavLink>
    </div>
  )
}
