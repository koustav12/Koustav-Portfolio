import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { useSplitTextHover } from '../hooks/useSplitTextHover'

type AnimatedNavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function AnimatedNavLink({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: AnimatedNavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  useSplitTextHover(ref)

  return (
    <a
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </a>
  )
}
