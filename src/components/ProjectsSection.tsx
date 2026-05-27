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

    gsap.set(items, { opacity: 0, y: 30, scale: 0.96 })

    let lastSeg = -2

    const tick = () => {
      if (window.innerWidth <= 640) return

      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const raw = clamp(0, 1, -rect.top / scrollable)

      const newSeg: number = raw < DELAY
        ? -1
        : raw >= 1
          ? 2
          : Math.floor(clamp(0, 2.999, (clamp(0, 1, (raw - DELAY) / (1 - DELAY))) * 3))

      if (newSeg === lastSeg) return

      const forward = newSeg > lastSeg

      for (let i = 0; i < items.length; i++) {
        if (i === newSeg) {
          if (i === 0) {
            // project 1: no entrance animation — snap in
            gsap.set(items[i], { opacity: 1, y: 0, scale: 1 })
          } else {
            gsap.to(items[i], {
              opacity: 1, y: 0, scale: 1,
              duration: 0.55, ease: 'power3.out', overwrite: true,
            })
          }
        } else if (i === lastSeg) {
          gsap.to(items[i], {
            opacity: 0,
            y: forward ? -30 : 30,
            scale: forward ? 1.03 : 0.96,
            duration: 0.4, ease: 'power2.in', overwrite: true,
          })
        }

        const dot = dots[i]
        if (dot) {
          dot.style.opacity   = i === newSeg ? '1'           : '0.2'
          dot.style.transform = i === newSeg ? 'scale(1.65)' : 'scale(1)'
        }
      }

      lastSeg = newSeg
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
    <section className="projects-section" ref={sectionRef} aria-label="Work I've shipped">
      <div className="projects-section__inner" ref={innerRef}>

        <h2 className="projects-section__header" aria-label="Work I've shipped">
          Work I've shipped
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
