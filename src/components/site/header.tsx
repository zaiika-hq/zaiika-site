import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Logo } from "@/components/site/logo"

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "product", label: "What we're building" },
  { id: "early-access", label: "Early access" },
  { id: "contact", label: "Contact" },
]

// The section being read is the last one whose top has passed 35% of the screen. A clicked link stays
// highlighted until its scroll finishes, so a short last section is not overtaken by the footer.
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id)
  const clicked = useRef<string | null>(null)

  useEffect(() => {
    let release: number | undefined
    const update = () => {
      if (clicked.current) {
        window.clearTimeout(release)
        release = window.setTimeout(() => (clicked.current = null), 150)
        return
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(SECTIONS[SECTIONS.length - 1].id)
        return
      }
      const line = window.innerHeight * 0.35
      let current = SECTIONS[0].id
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    // Any in-page link (nav, logo or a button in the page) marks its section as the one being read.
    const onLinkClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href^="#"]')
      const id = link?.getAttribute("href")?.slice(1)
      if (id && SECTIONS.some((section) => section.id === id)) {
        clicked.current = id
        setActive(id)
      }
    }
    update()
    document.addEventListener("click", onLinkClick)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.clearTimeout(release)
      document.removeEventListener("click", onLinkClick)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return active
}

export function Header() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  const linkClass = (id: string) =>
    `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      active === id ? "bg-white/10 text-foreground" : "text-white/65 hover:text-foreground"
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <a href="#top" aria-label="Zaiika home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} className={linkClass(id)}>
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-full border border-white/15 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-white/10 px-4 pt-2 pb-4 md:hidden">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              aria-current={active === id ? "true" : undefined}
              className={`block rounded-lg px-3 py-3 text-base ${
                active === id ? "bg-white/10 text-foreground" : "text-white/70"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
