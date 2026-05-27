import { useRef } from 'react'
import { useSplitTextHover } from '../hooks/useSplitTextHover'
import { SplitLetters } from './SplitLetters'

export function NavName() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  useSplitTextHover(linkRef)

  return (
    <a
      ref={linkRef}
      href="/"
      aria-current="page"
      className="nav-name w-inline-block w--current"
    >
      <SplitLetters text="Koustav" className="nav-name-jm is-peach" label="Koustav" />
      <div className="dot-jm" aria-hidden="true" />
      <SplitLetters text="Saha" className="nav-name-jm is-peach" label="Saha" />
    </a>
  )
}
