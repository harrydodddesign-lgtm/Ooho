import { useState, useEffect, useRef, useCallback } from 'react'

const primaryLinks = ['Work', 'Services', 'Pricing', 'Approach', 'Book a Call']
const resourceLinks = ['Writing', 'Twitter / X', 'LinkedIn', 'Terms of Service']
const X_POSITIONS = new Set([0, 2, 4, 6, 8])

export default function Nav({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Blur overlay — behind panel, closes on click */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
      />

      {/* Nav wrapper */}
      <div className="relative z-50">

        {/* Single dot grid — the only button */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-trigger cursor-pointer block"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <NavDotGrid open={open} theme={theme} />
        </button>

        {/* Panel — slides in from right, below button, aligned to content edge */}
        <div
          className="absolute top-[calc(100%+10px)] w-[240px] bg-midnight-ink rounded-md overflow-hidden transition-all duration-300 ease-out"
          style={{
            right: '-0.5rem',
            transform: open ? 'translateX(0)' : 'translateX(calc(100% + 1rem))',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          <nav className="flex flex-col px-4 pt-4 pb-1">
            {primaryLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className={`font-medium leading-none py-[5px] transition-colors duration-150 hover:text-cloud-white ${
                  i === 0 ? 'text-steel-gray' : 'text-cloud-white'
                }`}
                style={{ fontSize: '16px' }}
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="px-4 pt-3 pb-4">
            <div className="border-t border-cloud-white/10 pt-3">
              <p className="text-[10px] text-steel-gray uppercase tracking-widest mb-2">Resources</p>
              <div className="flex flex-col gap-1">
                {resourceLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[13px] text-cloud-white/50 hover:text-cloud-white transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

function NavDotGrid({ open, theme }: { open: boolean; theme: 'light' | 'dark' }) {
  const [lit, setLit] = useState<Set<number>>(new Set())
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  const flash = useCallback(() => {
    const count = 1 + Math.floor(Math.random() * 2)
    const shuffled = Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5)
    shuffled.slice(0, count).forEach(i => {
      setLit(prev => new Set([...prev, i]))
      const t = setTimeout(() => {
        setLit(prev => { const n = new Set(prev); n.delete(i); return n })
      }, 60 + Math.random() * 120)
      timers.current.push(t)
    })
  }, [])

  const start = useCallback(() => {
    flash()
    interval.current = setInterval(flash, 80 + Math.random() * 140)
  }, [flash])

  const stop = useCallback(() => {
    if (interval.current) clearInterval(interval.current)
    timers.current.forEach(clearTimeout)
    timers.current = []
    setLit(new Set())
  }, [])

  useEffect(() => () => stop(), [stop])

  return (
    <div
      className="grid grid-cols-3 gap-[3.5px]"
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const isX = X_POSITIONS.has(i)
        const isLit = lit.has(i)

        const baseColor = theme === 'light' ? '#ffffff' : '#09090b'
        const bg = isLit ? '#FFFFFF' : baseColor

        return (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full"
            style={{
              backgroundColor: bg,
              opacity: open && !isX && !isLit ? 0 : 1,
              transition: isLit ? 'none' : 'background-color 300ms, opacity 200ms',
            }}
          />
        )
      })}
    </div>
  )
}
