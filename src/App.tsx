import "@fontsource/instrument-serif/400-italic.css"

import { Badge } from "@/components/ui/badge"
import { About, EarlyAccess, Footer } from "@/components/site/sections"
import { Stars } from "@/components/site/stars"
import { Waitlist } from "@/components/site/waitlist"

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:h-18 sm:px-6">
        <a href="#top" aria-label="Zaiika home" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 sm:size-10 sm:text-xl"
          >
            Z
          </span>
          <span className="text-xl font-semibold tracking-tight sm:text-2xl">Zaiika</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Stars />
        <div className="sky-glow" />
        <div className="planet" />
        <div className="planet-rim" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-[max(16vh,6rem)] text-center">
        <Badge
          variant="outline"
          className="mb-7 h-auto gap-2 rounded-full border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-normal text-white/90 backdrop-blur"
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Restaurant OS
          <span aria-hidden className="h-3.5 w-px bg-white/15" />
          <span className="text-white/60">Early access</span>
        </Badge>

        <h1 className="font-heading max-w-3xl text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-balance min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
          Run your restaurant, <span className="serif-italic text-[1.08em]">smarter.</span>
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-relaxed tracking-wide text-balance text-white/70">
          Zaiika is an AI-first operating system for restaurants in India. Be among the first to try it.
        </p>

        <div className="mt-8 flex w-full justify-center">
          <Waitlist id="email-hero" />
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  )
}
