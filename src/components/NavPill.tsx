import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useSplitTextHover } from '../hooks/useSplitTextHover'
import { SplitLetters } from './SplitLetters'

type NavPillProps = {
  logo: React.ReactNode
}

/** Internal nav link that uses React Router Link + split-text hover animation */
function PillLink({
  to,
  className,
  children,
  onMouseEnter,
}: {
  to: string
  className: string
  children: React.ReactNode
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useSplitTextHover(ref)
  return (
    <Link ref={ref} to={to} className={className} onMouseEnter={onMouseEnter}>
      {children}
    </Link>
  )
}

export function NavPill({ logo }: NavPillProps) {
  const pillRef      = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const iconRef      = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const isAbout      = pathname === '/about'

  const moveIndicator = useCallback((target: HTMLElement) => {
    const pill      = pillRef.current
    const indicator = indicatorRef.current
    if (!pill || !indicator) return

    const pillRect   = pill.getBoundingClientRect()
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
    const pill = pillRef.current
    if (!pill) return

    const defaultSelector = isAbout ? '.nav-pill__link--about' : '.nav-pill__link--logo'
    const defaultLink = pill.querySelector<HTMLElement>(defaultSelector)
    if (!defaultLink) return

    const setInitial = () => {
      if (indicatorRef.current) gsap.set(indicatorRef.current, { opacity: 1 })
      moveIndicator(defaultLink)
    }
    setInitial()
    window.addEventListener('resize', setInitial)

    return () => {
      window.removeEventListener('resize', setInitial)
      gsap.killTweensOf(indicatorRef.current)
    }
  }, [moveIndicator, isAbout])

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
    const pill = pillRef.current
    if (!pill) return
    const defaultSelector = isAbout ? '.nav-pill__link--about' : '.nav-pill__link--logo'
    const defaultLink = pill.querySelector<HTMLElement>(defaultSelector)
    if (defaultLink) moveIndicator(defaultLink)
  }

  return (
    <div className="nav-pill" ref={pillRef} onMouseLeave={onPillLeave}>
      <div className="nav-pill__indicator" ref={indicatorRef} aria-hidden="true" />

      <PillLink
        to="/about"
        className="nav-pill__link nav-pill__link--about nav-link is-peach"
        onMouseEnter={(e) => moveIndicator(e.currentTarget)}
      >
        <SplitLetters text="About" />
      </PillLink>

      <PillLink
        to="/"
        className="nav-pill__link nav-pill__link--logo w-inline-block w--current"
        onMouseEnter={onLogoEnter}
      >
        <div className="jm-icon" ref={iconRef} onMouseLeave={onLogoLeave}>
          {logo}
        </div>
      </PillLink>

      <PillLink
        to="/work"
        className="nav-pill__link nav-link is-peach"
        onMouseEnter={(e) => moveIndicator(e.currentTarget)}
      >
        <SplitLetters text="Work" />
      </PillLink>
    </div>
  )
}
