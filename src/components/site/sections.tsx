import { ChefHat, IndianRupee, Sparkles, Store } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Waitlist } from "@/components/site/waitlist"

const CONTACT_EMAIL = "hello@zaiika.com"

type Pillar = { icon: LucideIcon; title: string; text: string }

const PILLARS: Pillar[] = [
  {
    icon: ChefHat,
    title: "Smooth service",
    text: "From the first order to the last bill of the night, Zaiika keeps the counter, the floor and the kitchen working together.",
  },
  {
    icon: IndianRupee,
    title: "Clarity on money",
    text: "Know what your restaurant earned, spent and lost each day, without digging through reports.",
  },
  {
    icon: Sparkles,
    title: "AI that does the work",
    text: "Zaiika uses AI to take routine work off the owner's plate and point out what needs attention.",
  },
  {
    icon: Store,
    title: "Made for India",
    text: "Built around GST, UPI and the way Indian restaurants, cafes and cloud kitchens actually run.",
  },
]

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium tracking-wide text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
    </div>
  )
}

export function About() {
  return (
    <section id="product" className="px-4 pt-8 pb-16 sm:pt-12 sm:pb-20">
      <SectionHeading eyebrow="What we're building" title="An AI-first operating system for restaurants" />
      <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-white/70">
        Zaiika brings everything a restaurant runs on into one simple product, and helps owners make better decisions
        every day.
      </p>
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
        {PILLARS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-card/60 p-6">
            <div className="flex items-center gap-3">
              <Icon aria-hidden className="size-6 shrink-0 text-primary" />
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <p className="mt-2 leading-relaxed text-white/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function EarlyAccess() {
  return (
    <section id="early-access" className="px-4 pt-8 pb-24 sm:pb-28">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-primary/15 to-transparent px-6 py-14 text-center">
        <SectionHeading eyebrow="Early access" title="Your first month is on us" />
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          We are starting with a small group of restaurants. Those who join early get their first month of Zaiika free,
          with no card needed.
        </p>
        <div className="mt-8 flex justify-center">
          <Waitlist id="email-early-access" />
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row sm:px-2">
        <p>
          <span className="font-medium text-foreground">Zaiika</span> · Built with care in India
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
          {CONTACT_EMAIL}
        </a>
        <p>© {new Date().getFullYear()} Zaiika</p>
      </div>
    </footer>
  )
}
