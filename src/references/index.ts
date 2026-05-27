import juanMoraNavHtml from './juan-mora-nav.html?raw'

export type ReferenceEntry = {
  id: string
  title: string
  source: string
  html: string
  screenshot?: string
  notes?: string
}

export const references: ReferenceEntry[] = [
  {
    id: 'juan-mora-nav',
    title: 'Juan Mora — Nav',
    source: 'morable.co (inspect)',
    html: juanMoraNavHtml,
    screenshot: '/references/juan-mora-nav.png',
    notes:
      'Three-column header: name · center nav (About, Lottie logo, Work) · social links. GSAP SplitText letter wrappers. Lottie SVG trimmed in archive — paste full SVG from inspect when needed.',
  },
]
