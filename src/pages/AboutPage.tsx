import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './AboutPage.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const ORANGE_FILL_END   = 0.35
const RINGS_START       = 0.20
const RINGS_END         = 0.80
const ORANGE_FADE_START = 0.68
const ORANGE_FADE_END   = 0.90

const ABOUT_SECTIONS = [
  {
    id: 'who',
    heading: 'Who I Am',
    paragraphs: [
      "I'm Koustav Saha, a Product Manager at Adobe Illustrator, based in India. I focus on bringing generative AI capabilities to the world's most powerful design canvas — helping millions of designers create more efficiently and expressively.",
      "My work sits at the intersection of cutting-edge AI research and real-world creative workflows. I care deeply about building tools that feel intuitive, powerful, and worthy of the professionals who depend on them every day.",
    ],
  },
  {
    id: 'workex',
    heading: 'My Work Experience',
    paragraphs: [
      "Currently, I lead product strategy for Generative AI features at Adobe Illustrator, defining the core interaction model and quality bar for what 'good' looks like when AI meets professional design.",
      "Before this, I worked across early-stage product development — shipping features used by millions of creatives globally and building the cross-functional muscle to move from ambiguous idea to polished launch.",
    ],
  },
  {
    id: 'education',
    heading: 'My Education',
    paragraphs: [
      "I hold a degree in [Field] from [University]. My academic background gave me a strong foundation in systems thinking and human-centered design — skills I apply every day to make complex AI technology feel accessible and natural.",
      "Beyond formal education, I've been shaped by the craft of building products alongside exceptional designers, engineers, and researchers who push me to raise the bar on every decision.",
    ],
  },
  {
    id: 'approach',
    heading: 'My PM Approach',
    paragraphs: [
      "I start by deeply understanding the user and their workflow — not just what they do, but why it matters to them. I look for the simplest solution that delivers the most value, then work closely with design, engineering, and research to define what 'good' looks like before writing a single line of spec.",
      "I believe clarity is a superpower. A well-framed problem saves more time than any perfectly written PRD. I invest in making sure the whole team sees the same north star.",
    ],
  },
  {
    id: 'philosophy',
    heading: 'My PM Philosophy',
    paragraphs: [
      "Great products feel inevitable in hindsight. My job is to reduce ambiguity, enable the team, and protect the quality of the outcome — even when the path is unclear.",
      "Speed of learning matters more than speed of shipping. I'd rather ship a smaller thing that teaches us something real than a large thing that answers no questions. Strong opinions, held loosely.",
    ],
  },
]

function KsLogoMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 142 217"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="about-hero__logo-svg"
    >
      <path fill="rgb(255,255,255)" d="M71.3,-46.44 C71.3,-46.44 71.3,46.44 71.3,46.44 C71.3,60.16 60.16,71.3 46.44,71.3 C46.44,71.3 -46.44,71.3 -46.44,71.3 C-60.16,71.3 -71.3,60.16 -71.3,46.44 C-71.3,46.44 -71.3,-46.44 -71.3,-46.44 C-71.3,-60.16 -60.16,-71.3 -46.44,-71.3 C-46.44,-71.3 46.44,-71.3 46.44,-71.3 C60.16,-71.3 71.3,-60.16 71.3,-46.44z" transform="translate(71, 108.5)" />
      <path fill="rgb(46,84,254)" d="M12.61,6.53 L0.48,42.74 C-1.01,47.21 1.08,51.59 5.16,52.55 C9.24,53.5 13.76,50.66 15.26,46.2 L27.39,9.99 C28.89,5.51 26.79,1.14 22.71,0.19 C18.63,-0.77 14.11,2.05 12.61,6.51z" transform="translate(55, 82)" />
      <path fill="rgb(46,84,254)" d="M12.61,6.53 L0.48,42.74 C-1.01,47.21 1.08,51.59 5.16,52.55 C9.24,53.5 13.76,50.66 15.26,46.2 L27.39,9.99 C28.89,5.51 26.79,1.14 22.71,0.19 C18.63,-0.77 14.11,2.05 12.61,6.51z" transform="translate(80, 82)" />
      <path fill="rgb(46,84,254)" d="M15.6,6.47 L0.48,51.11 C-1.01,55.54 1.08,59.88 5.17,60.83 C9.26,61.78 13.78,58.96 15.28,54.54 L30.4,9.9 C31.9,5.47 29.8,1.13 25.71,0.18 C21.63,-0.76 17.1,2.04 15.6,6.47z" transform="translate(28, 81)" />
    </svg>
  )
}

export function AboutPage() {
  const driverRef = useRef<HTMLDivElement>(null)
  const orangeRef = useRef<HTMLDivElement>(null)
  const ring1Ref  = useRef<HTMLDivElement>(null)
  const ring2Ref  = useRef<HTMLDivElement>(null)
  const ring3Ref  = useRef<HTMLDivElement>(null)
  const ring4Ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const headerEl = document.querySelector<HTMLElement>('.site-header')
    if (!headerEl) return
    headerEl.classList.add('is-on-white')
    return () => headerEl.classList.remove('is-on-white')
  }, [])

  useEffect(() => {
    const driver = driverRef.current
    const orange = orangeRef.current
    const ring1  = ring1Ref.current
    const ring2  = ring2Ref.current
    const ring3  = ring3Ref.current
    const ring4  = ring4Ref.current
    if (!driver || !orange || !ring1 || !ring2 || !ring3 || !ring4) return
    const rings  = [ring1, ring2, ring3, ring4]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      orange.style.opacity = '0'
      rings.forEach((r) => { r.style.opacity = '1'; r.style.transform = 'scale(1.2)' })
      return
    }

    // Rings start at a visible scale so the arcs are immediately apparent
    orange.style.transform = 'scale(0.45)'
    orange.style.opacity   = '1'
    rings.forEach((r) => { r.style.opacity = '0'; r.style.transform = 'scale(0.4)' })

    const tick = () => {
      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress   = clamp(0, 1, -rect.top / scrollable)

      // Orange: fill in, then fade out when rings exit
      const fillP   = clamp(0, 1, progress / ORANGE_FILL_END)
      const fadeP   = clamp(0, 1, (progress - ORANGE_FADE_START) / (ORANGE_FADE_END - ORANGE_FADE_START))
      orange.style.transform = `scale(${0.45 + fillP * 0.55})`
      orange.style.opacity   = String(1 - fadeP)

      // All four rings scale together, staggered fade-in
      const ringsP    = clamp(0, 1, (progress - RINGS_START) / (RINGS_END - RINGS_START))
      const ringScale = 0.4 + ringsP * 1.0   // 0.4 → 1.4 (ring 4 exits at ~0.72)

      ring1.style.opacity = String(clamp(0, 1, (ringsP - 0.00) * 4))
      ring2.style.opacity = String(clamp(0, 1, (ringsP - 0.07) * 4))
      ring3.style.opacity = String(clamp(0, 1, (ringsP - 0.14) * 4))
      ring4.style.opacity = String(clamp(0, 1, (ringsP - 0.21) * 4))
      rings.forEach((r) => { r.style.transform = `scale(${ringScale})` })
    }

    tick()
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <>
      <div className="about-driver" ref={driverRef}>
        <div className="about-bg-sticky" aria-hidden="true">
          <div className="about-bg__orange" ref={orangeRef} />
          <div className="about-bg__ring about-bg__ring--1" ref={ring1Ref} />
          <div className="about-bg__ring about-bg__ring--2" ref={ring2Ref} />
          <div className="about-bg__ring about-bg__ring--3" ref={ring3Ref} />
          <div className="about-bg__ring about-bg__ring--4" ref={ring4Ref} />
        </div>

        <div className="about-hero">
          <div className="about-hero__logo-tile" aria-hidden="true">
            <KsLogoMark />
          </div>
          <h1 className="about-hero__title">
            Product manager
            <br />based in India,
            <br />working globally
          </h1>
        </div>
      </div>

      <section className="about-continued" aria-label="About Koustav">
        {ABOUT_SECTIONS.map((section) => (
          <div key={section.id} className="about-section">
            <h2 className="about-section__heading">{section.heading}</h2>
            <div className="about-section__body">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
