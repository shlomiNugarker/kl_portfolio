import type { ReactNode } from 'react'

// Editorial section header: a small mono, numbered eyebrow with a fading
// hairline, then the display heading. Gives the page a consistent visual
// rhythm ("01 — About" … "05 — Contact") and makes each section feel indexed
// rather than stacked. The hairline fades toward the inline end, so it
// mirrors automatically in RTL.
const SectionHeading = ({
  num,
  eyebrow,
  children,
}: {
  // Zero-padded section index ("01" … "05").
  num: string
  eyebrow: string
  children: ReactNode
}) => (
  <div className="flex flex-col gap-3 xl:gap-4">
    {/* Centered below xl (sections are text-center there), start-aligned with
        a fading hairline on the wide layout. */}
    <div className="flex items-center justify-center gap-3 xl:justify-start">
      <span
        aria-hidden
        className="font-mono text-sm font-semibold tracking-[0.2em] text-kl-emphasis"
      >
        {num}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-kl-description">
        {eyebrow}
      </span>
      <span
        aria-hidden
        className="hidden h-px w-40 bg-linear-to-r from-kl-border-strong to-transparent rtl:bg-linear-to-l xl:block"
      />
    </div>
    <h2
      className="text-4xl font-bold xl:text-5xl"
      style={{ fontVariantCaps: 'small-caps' }}
    >
      {children}
    </h2>
  </div>
)

export default SectionHeading
