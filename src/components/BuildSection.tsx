import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './BuildSection.css'

const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v))

export function BuildSection() {
  const driverRef = useRef<HTMLDivElement>(null)
  const line1Ref  = useRef<HTMLDivElement>(null)
  const line2Ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const driver = driverRef.current
    const line1  = line1Ref.current
    const line2  = line2Ref.current
    if (!driver || !line1 || !line2) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const setX1 = gsap.quickSetter(line1, 'x', 'px') as (v: number) => void
    const setX2 = gsap.quickSetter(line2, 'x', 'px') as (v: number) => void

    const tick = () => {
      const rect       = driver.getBoundingClientRect()
      const scrollable = driver.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = clamp(0, 1, -rect.top / scrollable)
      const dist     = Math.min(window.innerWidth * 0.28, 380) * progress

      setX1(-dist)
      setX2(dist)
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      line1.style.removeProperty('transform')
      line2.style.removeProperty('transform')
    }
  }, [])

  return (
    <div className="build-section-driver" ref={driverRef}>
      <section className="build-section-sticky" aria-label="Build products people love">
        <div className="build-section__inner">
          <div className="build-section__line" ref={line1Ref}>Build products</div>
          <div className="build-section__line" ref={line2Ref}>People love</div>
        </div>
      </section>
    </div>
  )
}
