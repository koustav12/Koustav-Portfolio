import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './NextSection.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

const LINES = [
  ['7', 'years'],
  ['enabling'],
  ['designers', 'build'],
  ['delightful', 'experiences'],
]

const LINES_INDEXED = LINES.map((words, lineIndex) => {
  const offset = LINES.slice(0, lineIndex).reduce((sum, row) => sum + row.length, 0)
  return words.map((word, wi) => ({ word, lineIndex, wi, i: offset + wi }))
})

const WORD_COUNT = LINES.flat().length

export function NextSection() {
  const driverRef = useRef<HTMLDivElement>(null)
  const copyRef   = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const driver = driverRef.current
    const copy   = copyRef.current
    if (!driver || !copy) return

    const cells = Array.from(copy.querySelectorAll<HTMLElement>('.next-section__wordCell'))
    if (cells.length !== WORD_COUNT) return

    const wordHots = cells.map((c) => c.querySelector<HTMLElement>('.next-section__word-hot'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordHots.forEach((h) => { if (h) h.style.opacity = '1' })
      return
    }

    const REVEAL_END = 0.5

    const tick = () => {
      const rect      = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = clamp(0, 1, -rect.top / scrollable)
      const revealP  = clamp(0, 1, progress / REVEAL_END)

      for (let i = 0; i < wordHots.length; i++) {
        const h = wordHots[i]
        if (!h) continue
        h.style.opacity = String(clamp(0, 1, revealP * WORD_COUNT - i))
      }
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      wordHots.forEach((h) => { if (h) h.style.removeProperty('opacity') })
    }
  }, [])

  return (
    <div className="next-section-driver" ref={driverRef}>
      <section className="next-section">
        <div className="next-section__inner">
          <h2
            ref={copyRef}
            className="next-section__copy"
            aria-label="7 years enabling designers build delightful experiences"
          >
            {LINES_INDEXED.map((row, lineIndex) => (
              <span key={lineIndex} className="next-section__line">
                {row.map(({ word, wi, i }) => (
                  <span key={`${lineIndex}-${wi}`} className="next-section__wordCell" data-word-i={i}>
                    <span className="next-section__word-base">{word}</span>
                    <span className="next-section__word-hot" aria-hidden="true">{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
      </section>
    </div>
  )
}
