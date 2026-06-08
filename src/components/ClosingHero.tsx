import './ClosingHero.css'
import { asset } from '../utils/asset'

export function ClosingHero() {
  return (
    <section className="closing-hero" aria-label="Koustav Saha">

      {/* Background video */}
      <video
        className="closing-hero__video"
        src={asset('/projects/closing-hero.mp4')}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark vignette overlay */}
      <div className="closing-hero__overlay" aria-hidden="true" />

      {/* Bottom: name + info */}
      <div className="closing-hero__bottom">
        <div className="closing-hero__name" aria-label="Koustav Saha">
          <span className="closing-hero__first" aria-hidden="true">Koustav</span>
          <span className="closing-hero__last"  aria-hidden="true">Saha</span>
        </div>
        <div className="closing-hero__meta">
          <span className="closing-hero__meta-left">
            Product Manager · Adobe Illustrator&ensp;&ensp;2026
          </span>
        </div>
      </div>

    </section>
  )
}
