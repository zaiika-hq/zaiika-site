import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function App() {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0" />
        <div
          className="ember absolute left-1/2 top-1/2 size-[34rem] -translate-x-[60%] -translate-y-[55%]"
          style={{ background: "var(--glow-a)" }}
        />
        <div
          className="ember ember-b absolute left-1/2 top-1/2 size-[26rem] -translate-x-[20%] -translate-y-[30%]"
          style={{ background: "var(--glow-b)" }}
        />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <Badge variant="outline" className="mb-8 gap-2 border-primary/30 bg-background/40 backdrop-blur">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Coming soon
        </Badge>

        <h1 className="font-heading text-7xl font-semibold tracking-tighter sm:text-9xl">
          Zaiika<span className="chili-dot">.</span>
        </h1>

        <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
          Something new is <span className="chili-text font-medium">cooking</span>.
        </p>

        <Separator className="my-10 max-w-24 bg-primary/30" />

        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">Soon, we'll be here.</p>
      </main>

      <footer className="px-4 pb-8 text-center text-sm text-muted-foreground">© 2026 Zaiika</footer>
    </div>
  )
}
