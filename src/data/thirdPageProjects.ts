export type ThirdPageProject = {
  id: string
  title: string
  description?: string
  posterSrc: string
  gifSrc?: string
  videoSrc?: string
}

export const THIRD_PAGE_PROJECTS: ThirdPageProject[] = [
  {
    id: 'project-1',
    title: 'Turntable',
    description: 'A deep dive into how designers interact with generative AI tools inside Illustrator — from research to shipped feature.',
    posterSrc: '/projects/poster-1.svg',
    gifSrc: '/projects/project-1.gif',
  },
  {
    id: 'project-2',
    title: 'Artboard Modernization',
    description: 'Redesigning the vector editing experience to reduce friction for new users without slowing down power users.',
    posterSrc: '/projects/poster-2.svg',
    videoSrc: '/projects/ArtboardModernization WN sped up.mp4',
  },
  {
    id: 'project-3',
    title: 'Gen Extend',
    description: 'Brought Generative Expand to Adobe Illustrator — enabling designers to grow images beyond their original frame using Firefly AI. Led end-to-end from concept to launch, defining the core interaction model, the prompt surface, and the quality bar for what "good" looks like.',
    posterSrc: '/projects/project-3.png',
    gifSrc: '/projects/project-3.png',
  },
]
