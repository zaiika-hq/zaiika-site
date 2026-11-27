import { type CSSProperties, useMemo } from "react"

const STAR_COUNT = 90

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export function Stars() {
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
