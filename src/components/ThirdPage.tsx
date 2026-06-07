import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './ThirdPage.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const EYEBROW = 'Product Manager · Adobe Illustrator'
const HEADLINE_WORDS = "Bringing generative AI to the world's most powerful design canvas".split(' ')
const WORD_COUNT = HEADLINE_WORDS.length
const REVEAL_END = 0.55
const SLIDE_END = 0.18  // both slide-ins complete by 18% scroll progress

export function ThirdPage() {
  const driverRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const driver   = driverRef.current
    const eyebrow  = eyebrowRef.current
    const headline = headlineRef.current
    if (!driver || !eyebrow || !headline) return

    const wordHots = Array.from(
      headline.querySelectorAll<HTMLElement>('.third-page__word-hot')
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordHots.forEach(h => { h.style.opacity = '1' })
      return
    }

    // Initial hidden state
    eyebrow.style.transform = 'translateX(-72px)'
    eyebrow.style.opacity = '0'
    headline.style.transform = 'translateX(80px)'

    const tick = () => {
      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = clamp(0, 1, -rect.top / scrollable)

      // Job title: slide in from left, completes at 70% of SLIDE_END
      const eyebrowP = clamp(0, 1, progress / (SLIDE_END * 0.7))
      eyebrow.style.transform = `translateX(${(1 - eyebrowP) * -72}px)`
      eyebrow.style.opacity = String(clamp(0, 1, eyebrowP * 1.6))

      // Headline description: slide in from right, completes at SLIDE_END
      const headlineP = clamp(0, 1, progress / SLIDE_END)
      headline.style.transform = `translateX(${(1 - headlineP) * 80}px)`

      // Word reveal: unchanged scroll-linked opacity animation
      const revealP = clamp(0, 1, progress / REVEAL_END)
      for (let i = 0; i < wordHots.length; i++) {
        wordHots[i].style.opacity = String(clamp(0, 1, revealP * WORD_COUNT - i))
      }
    }

    tick() // sync immediately to current scroll position
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      eyebrow.style.removeProperty('transform')
      eyebrow.style.removeProperty('opacity')
      headline.style.removeProperty('transform')
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
              </span>
            ))}
          </h2>
        </div>
      </section>
    </div>
  )
}
