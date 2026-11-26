import { type CSSProperties, type FormEvent, useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// The waitlist is a Google Form with one email question. Set both values once the form exists.
const WAITLIST_FORM_ACTION = ""
const WAITLIST_EMAIL_FIELD = ""

const EMBER_COUNT = 36

type Status = "idle" | "sending" | "done" | "error"

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function Embers() {
  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => {
        const r = (n: number) => seededRandom(i * 7 + n)
        const size = 1.5 + r(1) * 2.5
        return {
          left: `${10 + r(2) * 80}%`,
          width: `${size}px`,
          height: `${size}px`,
          "--drift": `${(r(3) - 0.5) * 120}px`,
          "--duration": `${7 + r(4) * 9}s`,
          "--delay": `${-r(5) * 16}s`,
        } as CSSProperties
      }),
    [],
  )
  return (
    <>
      {embers.map((style, i) => (
        <span key={i} className="ember-spark" style={style} />
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
      const body = new FormData()
      body.append(WAITLIST_EMAIL_FIELD, email)
      await fetch(WAITLIST_FORM_ACTION, { method: "POST", mode: "no-cors", body })
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <p className="text-base text-foreground" role="status">
        You're on the list. <span className="chili-text font-medium">We'll let you know.</span>
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
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
        className="h-11 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button type="submit" size="lg" className="h-11 shrink-0" disabled={status === "sending"}>
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
        <div className="sky-glow" />
        <Embers />
        <div className="horizon" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-[14vh] text-center">
        <Badge variant="outline" className="mb-8 gap-2 border-white/10 bg-white/[0.03] backdrop-blur">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Zaiika
        </Badge>

        <h1 className="font-heading max-w-3xl text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
          Something new is <span className="chili-text">cooking</span>.
        </h1>

        <p className="mt-5 text-lg text-muted-foreground">Soon, we'll be here.</p>

        {WAITLIST_FORM_ACTION && WAITLIST_EMAIL_FIELD && (
          <div className="mt-10 flex w-full justify-center">
            <Waitlist />
          </div>
        )}
      </main>

      <footer className="px-4 pb-6 text-center text-sm text-muted-foreground/80">© 2026 Zaiika</footer>
    </div>
  )
}
