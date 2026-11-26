import "@fontsource/instrument-serif/400-italic.css"

import { type CSSProperties, type FormEvent, useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// The waitlist is a Google Form with one email question. Set both values once the form exists.
const WAITLIST_FORM_ACTION = ""
const WAITLIST_EMAIL_FIELD = ""
const WAITLIST_READY = Boolean(WAITLIST_FORM_ACTION && WAITLIST_EMAIL_FIELD)

const STAR_COUNT = 90

type Status = "idle" | "sending" | "done" | "error"

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        const r = (n: number) => seededRandom(i * 11 + n)
        const size = r(1) < 0.85 ? 1 : 2
        return {
          left: `${r(2) * 100}%`,
          top: `${r(3) * 75}%`,
          width: `${size}px`,
          height: `${size}px`,
          "--o": `${0.15 + r(4) * 0.6}`,
          "--t": `${3 + r(5) * 5}s`,
          "--d": `${-r(6) * 8}s`,
        } as CSSProperties
      }),
    [],
  )
  return (
    <>
      {stars.map((style, i) => (
        <span key={i} className="star" style={style} />
      ))}
    </>
  )
}

function Waitlist() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    try {
      if (WAITLIST_READY) {
        const body = new FormData()
        body.append(WAITLIST_EMAIL_FIELD, email)
        await fetch(WAITLIST_FORM_ACTION, { method: "POST", mode: "no-cors", body })
      }
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <p className="text-base text-foreground" role="status">
        You're on the list. We'll let you know.
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md items-center gap-1.5 rounded-xl border border-white/10 bg-black/80 p-1.5 shadow-2xl"
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <Input
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="h-11 flex-1 border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        type="submit"
        size="lg"
        className="h-11 shrink-0 rounded-lg bg-white px-5 text-base text-black hover:bg-white/90"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Joining…" : "Get notified"}
      </Button>
      {status === "error" && (
        <span className="sr-only" role="alert">
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  )
}

export default function App() {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Stars />
        <div className="sky-glow" />
        <div className="planet" />
        <div className="planet-rim" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-[16vh] text-center">
        <Badge variant="outline" className="mb-7 gap-2 rounded-full border-white/15 bg-white/[0.03] px-3 py-1 text-sm backdrop-blur">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Zaiika · Coming soon
        </Badge>

        <h1 className="font-heading max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Something new is <span className="serif-italic text-[1.08em]">cooking.</span>
        </h1>

        <p className="mt-5 max-w-md text-lg text-balance text-muted-foreground">
          Good food takes time. So does what we're building. Join the waitlist for the first taste.
        </p>

        {(WAITLIST_READY || import.meta.env.DEV) && (
          <div className="mt-8 flex w-full justify-center">
            <Waitlist />
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          Built with care in <span className="text-foreground">India</span>
        </p>
      </main>
    </div>
  )
}
