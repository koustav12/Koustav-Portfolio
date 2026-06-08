import { useNavigate, useLocation, Link } from 'react-router-dom'
import { AnimatedNavLink } from './AnimatedNavLink'
import { NavName } from './NavName'
import { NavPill } from './NavPill'
import { SplitLetters } from './SplitLetters'
import './SiteNav.css'

function NavLogo() {
  return (
    <svg
      className="ks-icon-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 142 217"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path fill="rgb(255,255,255)" d="M71.3,-46.44 C71.3,-46.44 71.3,46.44 71.3,46.44 C71.3,60.16 60.16,71.3 46.44,71.3 C46.44,71.3 -46.44,71.3 -46.44,71.3 C-60.16,71.3 -71.3,60.16 -71.3,46.44 C-71.3,46.44 -71.3,-46.44 -71.3,-46.44 C-71.3,-60.16 -60.16,-71.3 -46.44,-71.3 C-46.44,-71.3 46.44,-71.3 46.44,-71.3 C60.16,-71.3 71.3,-60.16 71.3,-46.44z" transform="translate(71, 108.5)" />
      <path fill="rgb(46,84,254)" d="M12.61,6.53 L0.48,42.74 C-1.01,47.21 1.08,51.59 5.16,52.55 C9.24,53.5 13.76,50.66 15.26,46.2 L27.39,9.99 C28.89,5.51 26.79,1.14 22.71,0.19 C18.63,-0.77 14.11,2.05 12.61,6.51z" transform="translate(55, 82)" />
      <path fill="rgb(46,84,254)" d="M12.61,6.53 L0.48,42.74 C-1.01,47.21 1.08,51.59 5.16,52.55 C9.24,53.5 13.76,50.66 15.26,46.2 L27.39,9.99 C28.89,5.51 26.79,1.14 22.71,0.19 C18.63,-0.77 14.11,2.05 12.61,6.51z" transform="translate(80, 82)" />
      <path fill="rgb(46,84,254)" d="M15.6,6.47 L0.48,51.11 C-1.01,55.54 1.08,59.88 5.17,60.83 C9.26,61.78 13.78,58.96 15.28,54.54 L30.4,9.9 C31.9,5.47 29.8,1.13 25.71,0.18 C21.63,-0.76 17.1,2.04 15.6,6.47z" transform="translate(28, 81)" />
    </svg>
  )
}

export function SiteNav() {
  const navigate   = useNavigate()
  const { pathname } = useLocation()

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const scrollToContact = () => {
      document.getElementById('lets-talk')?.scrollIntoView({ behavior: 'smooth' })
    }
    if (pathname === '/') {
      scrollToContact()
    } else {
      navigate('/')
      setTimeout(scrollToContact, 400)
    }
  }

  return (
    <header className="site-header">
      <div className="container-2">
        <div className="cont-name-logo">
          <NavName />
        </div>
        <ul role="list" className="nav-menu w-list-unstyled">
          <li>
            <NavPill logo={<NavLogo />} />
          </li>
        </ul>
        <ol role="list" className="nav-social-wrapper w-list-unstyled">
          <li className="cont-social-link">
            <AnimatedNavLink
              href="#"
              onClick={handleEmailClick}
              className="nav-social-link is-peach"
              aria-label="Email"
            >
              <SplitLetters text="Email" />
            </AnimatedNavLink>
          </li>
          <li className="cont-social-link">
            <AnimatedNavLink
              href="https://www.linkedin.com/in/-koustav-saha-/"
              target="_blank"
              rel="noreferrer"
              className="nav-social-link is-peach"
              aria-label="in"
            >
              <SplitLetters text="in" />
            </AnimatedNavLink>
          </li>
          <li className="cont-social-link">
            <AnimatedNavLink
              href="https://x.com/optimist_techie"
              target="_blank"
              rel="noreferrer"
              className="nav-social-link is-peach"
              aria-label="x"
            >
              <SplitLetters text="x" />
            </AnimatedNavLink>
          </li>
          <li className="cont-social-link">
            <Link
              to="/coming-soon"
              className="nav-pill__link is-peach"
              aria-label="Be"
            >
              <SplitLetters text="Be" />
            </Link>
          </li>
        </ol>
      </div>
    </header>
  )
}
