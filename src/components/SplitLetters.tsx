type SplitLettersProps = {
  text: string
  className?: string
  label?: string
  /** slide = stacked duplicate for hover swap; single = one glyph (e.g. name wave) */
  variant?: 'slide' | 'single'
}

export function SplitLetters({
  text,
  className,
  label,
  variant = 'slide',
}: SplitLettersProps) {
  return (
    <div className={className} aria-label={label}>
      <div
        className="gsap_split_word gsap_split_word1"
        aria-hidden="true"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {text.split('').map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className={`gsap_split_letter gsap_split_letter${index + 1} gsap_split_letter--${variant}`}
            aria-hidden="true"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {variant === 'slide' ? (
              <span className="letter-clip">
                <span className="letter-stack">
                  <span className="letter-stack__char">{letter}</span>
                  <span className="letter-stack__char" aria-hidden="true">
                    {letter}
                  </span>
                </span>
              </span>
            ) : (
              <span className="letter-single">{letter}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
