import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { NextSection } from '../components/NextSection'
import { ThirdPage } from '../components/ThirdPage'
import { ProjectsSection } from '../components/ProjectsSection'
import { BuildSection } from '../components/BuildSection'
import { ContactSection } from '../components/ContactSection'
import { ClosingHero } from '../components/ClosingHero'

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const headerEl = document.querySelector<HTMLElement>('.site-header')
    if (!headerEl) return

    const onScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.85) headerEl.classList.add('is-on-white')
      else headerEl.classList.remove('is-on-white')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      headerEl.classList.remove('is-on-white')
    }
  }, [])

  return (
    <>
      <div className="page-halo" aria-hidden="true" />
      <main className="site-main">
        <div className="page-layer page-layer--1">
          <Hero />
        </div>
        <NextSection />
        <ThirdPage />
        <ProjectsSection />
        <BuildSection />
        <ContactSection />
        <ClosingHero />
      </main>
    </>
  )
}
