// The Zaiika mark: a serving dome (cloche) in the brand colour, beside the brand name.
function ClocheMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <circle cx="20" cy="9" r="2.6" className="fill-primary" />
      <path d="M6 29a14 14 0 0 1 28 0Z" className="fill-primary" />
      <rect x="3" y="31" width="34" height="3.5" rx="1.75" className="fill-primary" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <ClocheMark className="size-9 shrink-0 drop-shadow-[0_4px_14px_var(--glow-a)] sm:size-10" />
      <span className="text-xl font-semibold tracking-tight sm:text-2xl">Zaiika</span>
    </span>
  )
}
