import { useNavigate } from 'react-router-dom'
import './ComingSoonPage.css'

export function ComingSoonPage() {
  const navigate = useNavigate()

  return (
    <div className="cs-page">
      <div className="cs-content">
        <h1 className="cs-headline">
          Coming<br />Soon
        </h1>
        <p className="cs-sub">
          This page is being crafted. Check back soon.
        </p>

        <button
          className="cs-back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <span className="cs-back__arrow" aria-hidden="true">←</span>
          <span className="cs-back__label">Back to home</span>
        </button>
      </div>
    </div>
  )
}
