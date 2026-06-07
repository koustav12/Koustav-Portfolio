import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { THIRD_PAGE_PROJECTS } from '../data/thirdPageProjects'
import './ProjectsSection.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const DELAY = 0.12

export function ProjectsSection() {
  const driverRef  = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const driver  = driverRef.current
    const section = sectionRef.current
    const inner   = innerRef.current
    const items   = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    const dots    = dotRefs.current
    if (!driver || !section || !inner || items.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => { el.style.opacity = '1' })
      return
    }

    // Tile 1 starts visible (no entrance animation); tiles 2 & 3 start hidden
    gsap.set(items, { opacity: 0, y: 28, scale: 0.97 })
    gsap.set(items[0], { opacity: 1, y: 0, scale: 1 })

    // Dot 0 active by default
    dots.forEach((d, i) => {
      if (!d) return
      d.style.opacity   = i === 0 ? '1'           : '0.2'
      d.style.transform = i === 0 ? 'scale(1.65)' : 'scale(1)'
    })

    // shownTile tracks which tile is currently on screen
    let shownTile = 0

    const tick = () => {
      if (window.innerWidth <= 640) return

      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const raw = clamp(0, 1, -rect.top / scrollable)

      // Before DELAY maps to segment 0 so tile 1 always stays pinned
      const seg: number = raw < DELAY
        ? 0
        : raw >= 1
          ? 2
          : Math.floor(clamp(0, 2.999, (clamp(0, 1, (raw - DELAY) / (1 - DELAY))) * 3))

      if (seg === shownTile) return

      const prev    = shownTile
      const forward = seg > prev

      // Exit the outgoing tile (all tiles exit, including tile 1)
      gsap.to(items[prev], {
        opacity: 0,
        y: forward ? -28 : 28,
        scale: forward ? 1.02 : 0.97,
        duration: 0.55, ease: 'power2.inOut', overwrite: true,
      })

      // Enter the incoming tile
      gsap.to(items[seg], {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, ease: 'power2.out', overwrite: true,
      })

      // Update dots
      dots.forEach((d, i) => {
        if (!d) return
        d.style.opacity   = i === seg ? '1'           : '0.2'
        d.style.transform = i === seg ? 'scale(1.65)' : 'scale(1)'
      })

      shownTile = seg
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      items.forEach((el) => {
        gsap.killTweensOf(el)
        el.style.removeProperty('opacity')
        el.style.removeProperty('transform')
      })
      dots.forEach((d) => {
        d?.style.removeProperty('opacity')
        d?.style.removeProperty('transform')
      })
    }
  }, [])

  return (
    <div className="projects-section-driver" ref={driverRef}>
    <section className="projects-section" ref={sectionRef} aria-label="Projects I've shipped">
      <div className="projects-section__inner" ref={innerRef}>

        <h2 className="projects-section__header" aria-label="Projects I've shipped">
          Projects I've shipped
        </h2>

        <div className="projects-section__stage">
          {THIRD_PAGE_PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="project-item"
              ref={(el) => { itemRefs.current[i] = el }}
            >
              <div className="project-item__inner">
                <div className="project-item__tile">
                  {project.videoSrc ? (
                    <video
                      src={project.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.posterSrc}
                    />
                  ) : (
                    <img src={project.gifSrc ?? project.posterSrc} alt="" draggable={false} />
                  )}
                </div>
                <div className="project-item__info">
                  <h3 className="project-item__title">{project.title}</h3>
                  {project.description && (
                    <p className="project-item__desc">{project.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-section__dots">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="projects-section__dot"
              ref={(el) => { dotRefs.current[i] = el }}
            />
          ))}
        </div>

      </div>
    </section>
    </div>
  )
}
