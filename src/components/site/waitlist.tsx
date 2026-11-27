import { type FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// The waitlist is a Google Form with one email question.
const WAITLIST_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdxBkyrlkT2XN65ecL2G7cdEM1wbcJJ9JE8c1PlyxsXcGecWA/formResponse"
const WAITLIST_EMAIL_FIELD = "entry.1414753828"

type Status = "idle" | "sending" | "done" | "error"

export function Waitlist({ id }: { id: string }) {
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
        You're on the list. We'll be in touch.
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md flex-col gap-2 rounded-xl border border-white/10 bg-black/80 p-2 shadow-2xl min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-1.5 min-[420px]:p-1.5"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <Input
        id={id}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="h-11 w-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        type="submit"
        size="lg"
        className="h-11 w-full shrink-0 rounded-lg bg-white min-[420px]:w-auto px-5 text-base text-black hover:bg-white/90"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Joining…" : "Get early access"}
      </Button>
      {status === "error" && (
        <span className="sr-only" role="alert">
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  )
}
