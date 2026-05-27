import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

const LINE_1 = 'Building creative tools'
const LINE_2 = 'for the next billion creators'

function splitChars(text: string, className: string) {
  return text.split('').map((ch, i) => (
    <span key={i} className={className} aria-hidden="true">
      {ch === ' ' ? ' ' : ch}
    </span>
  ))
}

export function Hero() {
  const tagRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const tag = tagRef.current
    if (!tag) return

    const line1 = tag.querySelectorAll<HTMLElement>('.hero__tag-line--1 .hero__tag-char')
    const dots = tag.querySelectorAll<HTMLElement>('.hero__tag-dot')
    const line2 = tag.querySelectorAll<HTMLElement>('.hero__tag-line--2 .hero__tag-char')

    gsap.set(tag, { yPercent: -50 })
    gsap.set([...line1, ...dots, ...line2], { opacity: 0, y: 6 })

    const tl = gsap.timeline({ delay: 0.25 })

    tl.to(line1, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      stagger: 0.035,
      ease: 'power2.out',
    })

    tl.to(
      dots,
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        stagger: 0.22,
        ease: 'power2.out',
      },
      '+=0.18',
    )

    tl.to(
      line2,
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.032,
        ease: 'power2.out',
      },
      '+=0.35',
    )

    return () => {
      tl.kill()
      gsap.killTweensOf([...line1, ...dots, ...line2])
    }
  }, [])

  useEffect(() => {
    const name = nameRef.current
    if (!name) return

    const leftLetters = Array.from(
      name.querySelectorAll<HTMLElement>('.hero__name-word--left .hero__name-char'),
    )
    const rightLetters = Array.from(
      name.querySelectorAll<HTMLElement>('.hero__name-word--right .hero__name-char'),
    )
    const allLetters = [...leftLetters, ...rightLetters]
    if (!allLetters.length) return

    const leftWeights = leftLetters.map((_, i) =>
      leftLetters.length <= 1 ? 1 : 1 - i / (leftLetters.length - 1),
    )
    const rightWeights = rightLetters.map((_, i) =>
      rightLetters.length <= 1 ? 1 : i / (rightLetters.length - 1),
    )

    let leftWidths: number[] = leftLetters.map(() => 0)
    let rightWidths: number[] = rightLetters.map(() => 0)

    const measure = () => {
      gsap.set(allLetters, { x: 0, scaleX: 1 })
      leftWidths = leftLetters.map((el) => el.getBoundingClientRect().width)
      rightWidths = rightLetters.map((el) => el.getBoundingClientRect().width)
    }

    measure()
    const rafId = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)

    const scaleTweens = allLetters.map((el) =>
      gsap.quickTo(el, 'scaleX', { duration: 0.35, ease: 'power3.out' }),
    )
    const xTweens = allLetters.map((el) =>
      gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' }),
    )

    const MAX_SQUISH = 0.55
    const clamp01 = gsap.utils.clamp(0, 1)

    const sumLeftWidths = () => leftWidths.reduce((a, b) => a + b, 0) || 1
    const sumRightWidths = () => rightWidths.reduce((a, b) => a + b, 0) || 1

    const onMove = (e: MouseEvent) => {
      const half = window.innerWidth / 2
      const norm = (e.clientX - half) / half

      const leftScales = new Array(leftLetters.length).fill(1)
      const rightScales = new Array(rightLetters.length).fill(1)

      if (norm <= 0) {
        const intensity = clamp01(-norm)
        for (let i = 0; i < leftLetters.length; i++) {
          leftScales[i] = 1 - leftWeights[i] * intensity * MAX_SQUISH
        }
        let leftLoss = 0
        for (let i = 0; i < leftLetters.length; i++) {
          leftLoss += (1 - leftScales[i]) * leftWidths[i]
        }
        const stretch = leftLoss / sumRightWidths()
        for (let i = 0; i < rightLetters.length; i++) {
          rightScales[i] = 1 + stretch
        }
      } else {
        const intensity = clamp01(norm)
        for (let i = 0; i < rightLetters.length; i++) {
          rightScales[i] = 1 - rightWeights[i] * intensity * MAX_SQUISH
        }
        let rightLoss = 0
        for (let i = 0; i < rightLetters.length; i++) {
          rightLoss += (1 - rightScales[i]) * rightWidths[i]
        }
        const stretch = rightLoss / sumLeftWidths()
        for (let i = 0; i < leftLetters.length; i++) {
          leftScales[i] = 1 + stretch
        }
      }

      let leftCumLoss = 0
      for (let i = 0; i < leftLetters.length; i++) {
        scaleTweens[i](leftScales[i])
        xTweens[i](-leftCumLoss)
        leftCumLoss += (1 - leftScales[i]) * leftWidths[i]
      }

      let rightCumLoss = 0
      for (let i = rightLetters.length - 1; i >= 0; i--) {
        const idx = leftLetters.length + i
        scaleTweens[idx](rightScales[i])
        xTweens[idx](rightCumLoss)
        rightCumLoss += (1 - rightScales[i]) * rightWidths[i]
      }
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', measure)
      window.removeEventListener('mousemove', onMove)
      gsap.killTweensOf(allLetters)
    }
  }, [])

  useEffect(() => {
    const tag = tagRef.current
    const name = nameRef.current
    if (!tag || !name) return

    const threshold = Math.max(0,
      name.getBoundingClientRect().top - tag.getBoundingClientRect().bottom
    )

    const setY = gsap.quickSetter(tag, 'y', 'px') as (v: number) => void

    const tick = () => {
      setY(Math.min(Math.max(0, window.scrollY), threshold))
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      setY(0)
    }
  }, [])

  return (
    <section className="hero">
      <div
        className="hero__tag"
        ref={tagRef}
        aria-label={`${LINE_1}... ${LINE_2}`}
      >
        <div className="hero__tag-line hero__tag-line--1">
          {splitChars(LINE_1, 'hero__tag-char')}
          <span className="hero__tag-dot" aria-hidden="true">.</span>
          <span className="hero__tag-dot" aria-hidden="true">.</span>
          <span className="hero__tag-dot" aria-hidden="true">.</span>
        </div>
        <div className="hero__tag-line hero__tag-line--2">
          {splitChars(LINE_2, 'hero__tag-char')}
        </div>
      </div>
      <h1 className="hero__name" aria-label="Koustav Saha" ref={nameRef}>
        <span className="hero__name-word hero__name-word--left">
          {splitChars('Koustav', 'hero__name-char')}
        </span>
        <span className="hero__name-word hero__name-word--right">
          {splitChars('Saha', 'hero__name-char')}
        </span>
      </h1>
    </section>
  )
}
