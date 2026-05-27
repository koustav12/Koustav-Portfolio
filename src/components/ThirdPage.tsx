import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ThirdPage.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const EYEBROW = 'Product Manager · Adobe Illustrator'
const HEADLINE_WORDS = "Bringing generative AI to the world's most powerful design canvas".split(' ')
const WORD_COUNT = HEADLINE_WORDS.length
const REVEAL_END = 0.55

export function ThirdPage() {
  const driverRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  // Eyebrow: fade in when section enters
  useEffect(() => {
    const driver  = driverRef.current
    const eyebrow = eyebrowRef.current
    if (!driver || !eyebrow) return

    gsap.registerPlugin(ScrollTrigger)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(eyebrow, { autoAlpha: 0, y: 16 })

    const tween = gsap.to(eyebrow, {
      autoAlpha: 1, y: 0,
      duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: driver, start: 'top 78%', once: true },
    })

    return () => { tween.scrollTrigger?.kill() }
  }, [])

  // Headline: scroll-linked word reveal (same mechanics as NextSection)
  useEffect(() => {
    const driver   = driverRef.current
    const headline = headlineRef.current
    if (!driver || !headline) return

    const wordHots = Array.from(
      headline.querySelectorAll<HTMLElement>('.third-page__word-hot')
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordHots.forEach(h => { h.style.opacity = '1' })
      return
    }

    const tick = () => {
      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = clamp(0, 1, -rect.top / scrollable)
      const revealP  = clamp(0, 1, progress / REVEAL_END)

      for (let i = 0; i < wordHots.length; i++) {
        wordHots[i].style.opacity = String(clamp(0, 1, revealP * WORD_COUNT - i))
      }
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      wordHots.forEach(h => h.style.removeProperty('opacity'))
    }
  }, [])

  return (
    <div className="third-page-driver" ref={driverRef}>
      <section className="third-page-sticky" aria-label="My role and focus">
        <div className="third-page__inner">
          <span ref={eyebrowRef} className="third-page__eyebrow">{EYEBROW}</span>
          <h2
            ref={headlineRef}
            className="third-page__headline"
            aria-label="Bringing generative AI to the world's most powerful design canvas"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="third-page__wordCell">
                <span className="third-page__word-base">{word}</span>
                <span className="third-page__word-hot" aria-hidden="true">{word}</span>
                {i < HEADLINE_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
        </div>
      </section>
    </div>
  )
}
