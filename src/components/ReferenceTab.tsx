import { useState } from 'react'
import { references, type ReferenceEntry } from '../references'
import './ReferenceTab.css'

const previewShell = (body: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    font-family: system-ui, sans-serif;
    background: linear-gradient(180deg, #1a1a22 0%, #2a2830 100%);
    padding: 2.5rem;
  }
  .container-2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
  }
  .cont-name-logo, .nav-menu, .nav-social-wrapper {
    display: flex;
    align-items: center;
  }
  .nav-name { display: inline-flex; align-items: center; gap: 0.45rem; text-decoration: none; }
  .dot-jm { width: 6px; height: 6px; background: #2e54fe; border-radius: 1px; }
  .is-peach { color: #f0d4c8; font-size: 15px; text-decoration: none; }
  .nav-menu, .nav-social-wrapper { list-style: none; gap: 0.35rem; }
  .nav-menu { flex: 1; justify-content: center; }
  .nav-social-wrapper { justify-content: flex-end; }
  .cont-social-link a {
    display: inline-flex;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    text-decoration: none;
  }
  .jm-icon { width: 38px; height: 58px; background: rgba(46,84,254,0.2); border-radius: 8px; }
  .w-list-unstyled { list-style: none; }
</style>
</head>
<body>${body}</body>
</html>`

function ReferenceDetail({ entry }: { entry: ReferenceEntry }) {
  const [showCode, setShowCode] = useState(true)

  return (
    <div className="reference-detail">
      <header className="reference-detail__meta">
        <div>
          <h2>{entry.title}</h2>
          <p className="reference-detail__source">{entry.source}</p>
          {entry.notes ? <p className="reference-detail__notes">{entry.notes}</p> : null}
        </div>
        <button
          type="button"
          className="reference-detail__toggle"
          onClick={() => setShowCode((v) => !v)}
        >
          {showCode ? 'Hide HTML' : 'Show HTML'}
        </button>
      </header>

      <div className={`reference-detail__panels ${showCode ? '' : 'reference-detail__panels--preview-only'}`}>
        <section className="reference-detail__preview">
          <h3>Preview</h3>
          {entry.screenshot ? (
            <figure className="reference-detail__screenshot">
              <img src={entry.screenshot} alt={`${entry.title} screenshot`} />
              <figcaption>Inspector capture</figcaption>
            </figure>
          ) : null}
          <iframe
            title={`${entry.title} preview`}
            className="reference-detail__iframe"
            srcDoc={previewShell(entry.html)}
            sandbox="allow-same-origin"
          />
        </section>
        {showCode ? (
          <section className="reference-detail__code">
            <h3>HTML</h3>
            <pre>
              <code>{entry.html}</code>
            </pre>
          </section>
        ) : null}
      </div>
    </div>
  )
}

export function ReferenceTab() {
  const [activeId, setActiveId] = useState(references[0]?.id ?? '')
  const active = references.find((r) => r.id === activeId) ?? references[0]

  if (!active) {
    return <p className="reference-empty">No references yet. Add entries in src/references/index.ts</p>
  }

  return (
    <div className="reference-tab">
      <nav className="reference-tab__nav" aria-label="Reference blocks">
        {references.map((ref) => (
          <button
            key={ref.id}
            type="button"
            className={`reference-tab__btn ${ref.id === active.id ? 'reference-tab__btn--active' : ''}`}
            onClick={() => setActiveId(ref.id)}
          >
            {ref.title}
          </button>
        ))}
      </nav>
      <ReferenceDetail entry={active} />
    </div>
  )
}
