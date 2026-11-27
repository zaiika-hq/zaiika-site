// The Zaiika mark: a serving dome that tips open to the right on its plate, letting steam rise, then settles back.
function ClocheMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <rect x="3" y="31" width="34" height="3.6" rx="1.8" className="fill-primary" />
      <g className="cloche-steam stroke-primary" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 27.5c-1-1.2 1-2.2 0-3.4M22 27.5c-1-1.2 1-2.2 0-3.4M27 27.5c-1-1.2 1-2.2 0-3.4" />
      </g>
      <g className="cloche-dome">
        <circle cx="20" cy="9" r="2.6" className="fill-primary" />
        <path d="M6 29a14 14 0 0 1 28 0Z" className="fill-primary" />
      </g>
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <ClocheMark className="size-9 shrink-0 overflow-visible drop-shadow-[0_4px_14px_var(--glow-a)] sm:size-10" />
      <span className="text-xl font-semibold tracking-tight sm:text-2xl">Zaiika</span>
    </span>
  )
}
