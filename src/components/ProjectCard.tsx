import './ProjectCard.css'

type ProjectCardProps = {
  posterSrc: string
  gifSrc?: string
  title: string
}

export function ProjectCard({ posterSrc, gifSrc, title }: ProjectCardProps) {
  const src = gifSrc ?? posterSrc

  return (
    <div className="project-card" aria-label={title}>
      <div className="project-card__media">
        <img src={src} alt="" className="project-card__img" draggable={false} />
      </div>
    </div>
  )
}
