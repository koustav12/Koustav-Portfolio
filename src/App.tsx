import { useEffect, useState } from 'react'
import { SiteNav } from './components/SiteNav'
import { Hero } from './components/Hero'
import { NextSection } from './components/NextSection'
import { ReferenceTab } from './components/ReferenceTab'
import { ThirdPage } from './components/ThirdPage'
import { ProjectsSection } from './components/ProjectsSection'
import { BuildSection } from './components/BuildSection'
import { ContactSection } from './components/ContactSection'
import { ClosingHero } from './components/ClosingHero'
import './App.css'

type AppView = 'site' | 'references'

export default function App() {
  const [view, setView] = useState<AppView>('site')

  useEffect(() => {
    if (view !== 'site') return
    const headerEl = document.querySelector<HTMLElement>('.site-header')
    if (!headerEl) return
    const onScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.85) headerEl.classList.add('is-on-white')
      else headerEl.classList.remove('is-on-white')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      headerEl.classList.remove('is-on-white')
    }
  }, [view])

  return (
    <div className="app">
      <nav className="app-view-switcher" aria-label="Development views">
        <button
          type="button"
          className={view === 'site' ? 'is-active' : ''}
          onClick={() => setView('site')}
        >
          Site
        </button>
        <button
          type="button"
          className={view === 'references' ? 'is-active' : ''}
          onClick={() => setView('references')}
        >
          References
        </button>
      </nav>

      {view === 'site' ? (
        <>
          <div className="page-halo" aria-hidden="true" />
          <SiteNav />
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
      ) : (
        <ReferenceTab />
      )}
    </div>
  )
}
