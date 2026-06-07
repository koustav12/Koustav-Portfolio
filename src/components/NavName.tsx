import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSplitTextHover } from '../hooks/useSplitTextHover'
import { SplitLetters } from './SplitLetters'

export function NavName() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  useSplitTextHover(linkRef)

  return (
    <Link
      ref={linkRef}
      to="/"
      className="nav-name w-inline-block w--current"
    >
      <SplitLetters text="Koustav" className="nav-name-jm is-peach" label="Koustav" />
      <div className="dot-jm" aria-hidden="true" />
      <SplitLetters text="Saha" className="nav-name-jm is-peach" label="Saha" />
    </Link>
  )
}
