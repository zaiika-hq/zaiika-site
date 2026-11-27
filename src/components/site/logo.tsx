import { useEffect, useState } from "react"

export const LOGO_EVENT = "zaiika-logo-change"

export type LogoChoice = { mark: string; wordmark: string; wordmarkStyle: string }

export const DEFAULT_LOGO: LogoChoice = { mark: "tile", wordmark: "title", wordmarkStyle: "sans" }

type MarkProps = { className?: string }

const tileClass = "fill-primary"

// Each mark is a 40 x 40 drawing that uses the theme's primary colour.
export const LOGO_MARKS: Record<string, { label: string; Mark: (props: MarkProps) => React.ReactElement | null }> = {
  tile: {
    label: "Z on a rounded tile",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <rect width="40" height="40" rx="11" className={tileClass} />
        <path d="M12 12h16L13 28h15" className="stroke-primary-foreground" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  circle: {
    label: "Z in a circle",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="20" className={tileClass} />
        <path d="M13 13h14L14 27h14" className="stroke-primary-foreground" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  outline: {
    label: "Outlined Z tile",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <rect x="2" y="2" width="36" height="36" rx="10" className="stroke-primary" strokeWidth="3" fill="none" />
        <path d="M13 13h14L14 27h14" className="stroke-primary" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  ribbon: {
    label: "Flowing Z (like a ladle stroke)",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M8 11c6-3 14-3 22 0L10 30c7 3 15 3 22 0" className="stroke-primary" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  bowl: {
    label: "Bowl with steam",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M5 21h30a15 15 0 0 1-30 0Z" className={tileClass} />
        <path d="M14 6c-2 2.5 2 4.5 0 7M20 4c-2 2.5 2 4.5 0 7M26 6c-2 2.5 2 4.5 0 7" className="stroke-primary" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  steam: {
    label: "Steam on a tile",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <rect width="40" height="40" rx="11" className={tileClass} />
        <path d="M13 29c-3-4 3-6 0-10s3-6 0-9M20 31c-3-4 3-6 0-10s3-6 0-10M27 29c-3-4 3-6 0-10s3-6 0-9" className="stroke-primary-foreground" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  cloche: {
    label: "Serving dome",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="9" r="2.6" className={tileClass} />
        <path d="M6 29a14 14 0 0 1 28 0Z" className={tileClass} />
        <rect x="3" y="31" width="34" height="3.5" rx="1.75" className={tileClass} />
      </svg>
    ),
  },
  thali: {
    label: "Thali from above",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" className="stroke-primary" strokeWidth="3" fill="none" />
        <circle cx="20" cy="12" r="4" className={tileClass} />
        <circle cx="12.5" cy="23" r="4" className={tileClass} />
        <circle cx="27.5" cy="23" r="4" className={tileClass} />
        <circle cx="20" cy="27.5" r="2" className={tileClass} opacity="0.6" />
      </svg>
    ),
  },
  chili: {
    label: "Chili",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M27 12c4 4 4 13-3 19S8 36 5 33c6 0 11-3 14-8s3-10 8-13Z" className={tileClass} />
        <path d="M27 12c0-3 2-5 5-6" className="stroke-primary" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  leaf: {
    label: "Curry leaf",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M8 32C6 18 16 7 34 6c1 18-10 28-26 26Z" className={tileClass} />
        <path d="M9 31 27 13" className="stroke-primary-foreground" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  spark: {
    label: "AI spark on a plate",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" className="stroke-primary" strokeWidth="3" fill="none" />
        <path d="M20 9c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11 6-1 10-5 11-11Z" className={tileClass} />
      </svg>
    ),
  },
  chat: {
    label: "Z in a chat bubble",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M6 4h28a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H16l-8 6v-6H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" className={tileClass} />
        <path d="M14 11h12L14 25h12" className="stroke-primary-foreground" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  hexagon: {
    label: "Z in a hexagon",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <path d="M20 2 36 11v18L20 38 4 29V11Z" className={tileClass} />
        <path d="M14 13h12L14 27h12" className="stroke-primary-foreground" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  dot: {
    label: "Dot (wordmark leads)",
    Mark: ({ className }) => (
      <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="9" className={tileClass} />
      </svg>
    ),
  },
  none: { label: "No mark, wordmark only", Mark: () => null },
}

export const WORDMARK_STYLES: Record<string, string> = {
  sans: "Heading font",
  serif: "Accent serif italic",
}

export const WORDMARKS: Record<string, string> = {
  title: "Zaiika",
  lower: "zaiika",
  upper: "ZAIIKA",
}

function readDevChoice(): LogoChoice {
  if (!import.meta.env.DEV) return DEFAULT_LOGO
  try {
    return { ...DEFAULT_LOGO, ...JSON.parse(localStorage.getItem("zaiika-logo") ?? "{}") }
  } catch {
    return DEFAULT_LOGO
  }
}

function useLogoChoice() {
  const [choice, setChoice] = useState<LogoChoice>(readDevChoice)
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const onChange = () => setChoice(readDevChoice())
    window.addEventListener(LOGO_EVENT, onChange)
    return () => window.removeEventListener(LOGO_EVENT, onChange)
  }, [])
  return choice
}

export function Logo() {
  const { mark, wordmark, wordmarkStyle } = useLogoChoice()
  const { Mark } = LOGO_MARKS[mark] ?? LOGO_MARKS[DEFAULT_LOGO.mark]
  const text = WORDMARKS[wordmark] ?? WORDMARKS[DEFAULT_LOGO.wordmark]
  return (
    <span className="flex items-center gap-2.5">
      <Mark className="size-9 shrink-0 drop-shadow-[0_4px_14px_var(--glow-a)] sm:size-10" />
      <span
        className={
          wordmarkStyle === "serif"
            ? "serif-italic text-2xl sm:text-3xl"
            : `text-xl font-semibold sm:text-2xl ${wordmark === "upper" ? "tracking-[0.12em]" : "tracking-tight"}`
        }
      >
        {text}
      </span>
    </span>
  )
}
