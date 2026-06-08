import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ContactSection } from '../components/ContactSection'
import { asset } from '../utils/asset'
import './AboutPage.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const ORANGE_FILL_END   = 0.35
const RINGS_START       = 0.00
const RINGS_END         = 0.82
const ORANGE_FADE_START = 0.68
const ORANGE_FADE_END   = 0.90

const ABOUT_SECTIONS = [
  {
    id: 'who',
    label: 'Who I Am',
    body: [
      "I'm Koustav Saha, a Product Manager at Adobe Illustrator with a deep passion for building creative tools that empower designers at every level — from students to professionals.",
      "Over the past 7 years, I've worked at the intersection of design, technology, and business — shipping products that millions of creators depend on every single day.",
      "I moved to product management from an engineering background, which means I think in systems and flows, but stay grounded in what the experience actually feels like to use.",
    ],
  },
  {
    id: 'approach',
    label: 'My PM Approach',
    body: [
      "I start with the user's job-to-be-done — not the feature request. Understanding the real problem before writing a single line of spec is non-negotiable for me.",
      "From there, I define success in outcomes rather than outputs: what changes in user behaviour tells us we shipped the right thing?",
      "I work closely with design, engineering, data science, and research as a collaborative partner — not a gatekeeper. The best product decisions come from diverse perspectives.",
    ],
  },
  {
    id: 'philosophy',
    label: 'My PM Philosophy',
    body: [
      "Great products are built at the intersection of deep user empathy, technical possibility, and business viability — and holding all three in tension is the core of the PM craft.",
      "I believe in shipping to learn. A good hypothesis tested in the market beats a perfect plan on paper every time.",
      "And ultimately — I believe the best technology disappears. It gets out of the way and lets the person using it feel more capable, more creative, and more themselves.",
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

  // Animate workex + edu cards in when they enter the viewport
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = document.querySelectorAll<HTMLElement>('[data-workex]')
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(40px)'
      card.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
    })
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      }),
      { threshold: 0.15 }
    )
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const driver = driverRef.current
    const orange = orangeRef.current
    const ring1  = ring1Ref.current
    const ring2  = ring2Ref.current
    const ring3  = ring3Ref.current
    const ring4  = ring4Ref.current
    if (!driver || !orange || !ring1 || !ring2 || !ring3 || !ring4) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      orange.style.opacity = '0'
      ;[ring1, ring2, ring3, ring4].forEach((r) => {
        r.style.opacity = '1'
        r.style.transform = 'scale(1.5)'
      })
      return
    }

    orange.style.transform = 'scale(0.45)'
    orange.style.opacity   = '1'
    ;[ring1, ring2, ring3, ring4].forEach((r) => {
      r.style.opacity   = '0'
      r.style.transform = 'scale(0.62)'
    })

    const tick = () => {
      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = clamp(0, 1, -rect.top / scrollable)

      const orangeFillP = clamp(0, 1, progress / ORANGE_FILL_END)
      orange.style.transform = `scale(${0.45 + orangeFillP * 0.55})`

      const orangeFadeP = clamp(0, 1, (progress - ORANGE_FADE_START) / (ORANGE_FADE_END - ORANGE_FADE_START))
      orange.style.opacity = String(1 - orangeFadeP)

      const ringsP    = clamp(0, 1, (progress - RINGS_START) / (RINGS_END - RINGS_START))
      const ringScale = 0.62 + ringsP * 0.93

      ring1.style.opacity = String(clamp(0, 1, (ringsP + 0.24) * 4))
      ring2.style.opacity = String(clamp(0, 1, (ringsP + 0.18) * 4))
      ring3.style.opacity = String(clamp(0, 1, (ringsP + 0.12) * 4))
      ring4.style.opacity = String(clamp(0, 1, (ringsP + 0.06) * 4))
      ;[ring1, ring2, ring3, ring4].forEach((r) => {
        r.style.transform = `scale(${ringScale})`
      })
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
          <div className="about-hero__content">
            <div className="about-hero__first-line">
              <div className="about-hero__logo-tile" aria-hidden="true">
                <KsLogoMark />
              </div>
              <span className="about-hero__title-line1">Product manager</span>
            </div>
            <p className="about-hero__title-rest">
              based in India,
              <br />working globally
            </p>
          </div>
        </div>
      </div>

      {/* Two-column about sections */}
      <section className="about-content" aria-label="About Koustav">
        <div className="about-content__inner">
          {ABOUT_SECTIONS.map((section) => (
            <div key={section.id} className="about-section">
              <div className="about-section__label-col">
                <h2 className="about-section__label">{section.label}</h2>
              </div>
              <div className="about-section__body-col">
                {section.body.map((para, i) => (
                  <p key={i} className="about-section__para">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="workex-section" aria-label="Work Experience">
        <div className="workex-inner">
          <h2 className="workex-heading">My Work Experience</h2>
          <div className="workex-grid">

            <div className="workex-card" data-workex>
              <div className="workex-card__logo-row">
                <img src={asset('/logos/adobe.png')} alt="Adobe" className="workex-card__logo-img" />
                <span className="workex-card__logo-cross">×</span>
                <img src={asset('/logos/illustrator.png')} alt="Illustrator" className="workex-card__logo-img workex-card__logo-img--icon" />
              </div>
              <div className="workex-card__body">
                <span className="workex-card__role">Product Manager</span>
                <span className="workex-card__tenure">2023 – Present</span>
                <p className="workex-card__desc">
                  Leading GenAI integration on Illustrator — from 0-to-1 launching Turntable to shipping AI-powered vector tools that modernized the world's most powerful design canvas.
                </p>
              </div>
            </div>

            <div className="workex-card workex-card--oracle" data-workex>
              <div className="workex-card__logo-row">
                <img src={asset('/logos/oracle.png')} alt="Oracle" className="workex-card__logo-img workex-card__logo-img--wide" />
              </div>
              <div className="workex-card__body">
                <span className="workex-card__role">Associate Consultant</span>
                <span className="workex-card__tenure">2019 – 2022</span>
                <p className="workex-card__desc">
                  Re-architected legacy financial data pipelines using Hadoop and Spark, cutting query times by 50% and delivering 5x faster performance for enterprise banking clients.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education */}
      <section className="workex-section edu-section" aria-label="Education">
        <div className="workex-inner">
          <h2 className="workex-heading">My Education</h2>
          <div className="workex-grid">

            <div className="workex-card workex-card--iima" data-workex>
              <div className="workex-card__logo-row">
                <img src={asset('/logos/iima.png')} alt="IIM Ahmedabad" className="workex-card__logo-img workex-card__logo-img--iima" />
              </div>
              <div className="workex-card__body">
                <span className="workex-card__role">MBA</span>
                <span className="workex-card__tenure">Batch of 2024</span>
                <p className="workex-card__desc">
                  Indian Institute of Management Ahmedabad — one of the world's premier management institutions. Focused on strategy, product thinking, and business leadership.
                </p>
              </div>
            </div>

            <div className="workex-card workex-card--ju" data-workex>
              <div className="workex-card__logo-row">
                <img src={asset('/logos/jadavpur.png')} alt="Jadavpur University" className="workex-card__logo-img workex-card__logo-img--ju" />
              </div>
              <div className="workex-card__body">
                <span className="workex-card__role">B.E. — Electronics Engineering</span>
                <span className="workex-card__tenure">Batch of 2019</span>
                <p className="workex-card__desc">
                  Jadavpur University, Kolkata — specialised in electronic sensors and instrumentation, building a strong foundation in signal processing, hardware systems, and engineering problem-solving.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
