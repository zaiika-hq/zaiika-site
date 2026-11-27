import { ChefHat, ChevronDown, IndianRupee, LayoutGrid, QrCode, Receipt, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const WORDS = ["smarter.", "faster.", "calmer.", "simpler."]

// Cycles the accent word of the headline; shows only the first word for reduced motion.
export function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2400)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <span className="relative inline-grid text-left align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <span key={index} className="word-in col-start-1 row-start-1">
        {WORDS[index]}
      </span>
    </span>
  )
}

const CHIPS = [
  { icon: Receipt, label: "GST billing", className: "left-[5%] top-[24%]", delay: "0s" },
  { icon: ChefHat, label: "Kitchen orders", className: "left-[10%] top-[46%]", delay: "-2s" },
  { icon: LayoutGrid, label: "Tables & floor", className: "left-[4%] top-[66%]", delay: "-4s" },
  { icon: QrCode, label: "UPI payments", className: "right-[5%] top-[24%]", delay: "-1s" },
  { icon: IndianRupee, label: "Daily sales", className: "right-[10%] top-[46%]", delay: "-3s" },
  { icon: Sparkles, label: "AI insights", className: "right-[4%] top-[66%]", delay: "-5s" },
]

// Glass chips drifting around the headline on wide screens.
export function FloatingChips() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[1340px]:block">
      {CHIPS.map(({ icon: Icon, label, className, delay }) => (
        <span
          key={label}
          style={{ animationDelay: delay }}
          className={`chip-float absolute inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/75 backdrop-blur ${className}`}
        >
          <Icon className="size-4 text-primary" />
          {label}
        </span>
      ))}
    </div>
  )
}

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Jaipur", "Ahmedabad", "Lucknow", "Chandigarh", "Kochi", "Indore", "Goa"]

// A slow strip of Indian cities, fading out at both edges.
export function CityStrip() {
  const row = CITIES.map((city) => (
    <span key={city} className="flex items-center gap-6">
      {city}
      <span className="size-1 rounded-full bg-primary/70" />
    </span>
  ))
  return (
    <div className="mt-10 w-full max-w-2xl">
      <p className="mb-3 text-xs tracking-[0.2em] text-white/45 uppercase">Built for restaurants across India</p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee flex w-max gap-6 text-sm text-white/60">
          {row}
          <span aria-hidden className="flex gap-6">{row}</span>
        </div>
      </div>
    </div>
  )
}

export function ScrollCue() {
  return (
    <a
      href="#product"
      className="absolute bottom-[max(14vh,7rem)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-white/50 hover:text-foreground [@media(max-height:640px)]:hidden"
    >
      Scroll
      <ChevronDown aria-hidden className="size-5 animate-bounce motion-reduce:animate-none" />
    </a>
  )
}
