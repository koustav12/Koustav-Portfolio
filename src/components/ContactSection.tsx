import { useEffect, useRef, useState } from 'react'
import './ContactSection.css'

const EMAIL = 'sahakoustav@gmail.com'

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

export function ContactSection() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hoveringBottom, setHoveringBottom] = useState(false)
  const [hoveringCta,    setHoveringCta]    = useState(false)
  const [copied,         setCopied]         = useState(false)

  useEffect(() => {
    const zone = bottomRef.current
    if (!zone) return

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top  = `${e.clientY}px`
      }
    }
    const onEnter = () => setHoveringBottom(true)
    const onLeave = () => setHoveringBottom(false)

    zone.addEventListener('mousemove', onMove)
    zone.addEventListener('mouseenter', onEnter)
    zone.addEventListener('mouseleave', onLeave)
    return () => {
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('mouseenter', onEnter)
      zone.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {}
  }

  return (
    <section className="contact-section" aria-label="Contact">
      <div className="contact-section__card">

        {/* Top: left-aligned heading + resume CTA */}
        <div className="contact-section__top">

          <div className="contact-section__left">
            <h2 className="contact-section__heading">
              Want to<br />know more<br />about me?
            </h2>
          </div>

          <div className="contact-section__right">
            <div
              className={`resume-cta${hoveringCta ? ' is-hovered' : ''}`}
              onMouseEnter={() => setHoveringCta(true)}
              onMouseLeave={() => setHoveringCta(false)}
            >
              <a href="/resume.pdf" download className="resume-cta__pill">
                <span className="resume-cta__label resume-cta__label--default">Learn more about me</span>
                <span className="resume-cta__label resume-cta__label--hover">Download resume</span>
              </a>
              <a href="/resume.pdf" download className="resume-cta__circle" aria-label="Download resume">
                <span className="resume-cta__icon resume-cta__icon--default">→</span>
                <span className="resume-cta__icon resume-cta__icon--hover"><DownloadIcon /></span>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="contact-section__divider" aria-hidden="true" />

        {/* Bottom row — entire strip is hover/click zone */}
        <div
          ref={bottomRef}
          className={`contact-section__bottom${hoveringBottom ? ' is-hovered' : ''}`}
          onClick={handleCopy}
          role="button"
          tabIndex={0}
          aria-label={`Copy email address: ${EMAIL}`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopy() }}
        >
          <div className="contact-section__fill" aria-hidden="true" />
          <span className="contact-section__arrow" aria-hidden="true">→</span>
          <div className="contact-section__cta">
            <span className="contact-section__talk-label">Let's talk</span>
            <span className="contact-section__talk-email">
              {copied ? '✓  Copied!' : EMAIL}
            </span>
          </div>
        </div>

      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`contact-cursor${hoveringBottom ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        <CopyIcon />
        <span className="contact-cursor__pill">
          {copied ? '✓ copied!' : 'copy my email'}
        </span>
      </div>
    </section>
  )
}
