import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  { id: 0, client: 'NanoMosaic',       blurb: 'Turning complex genomics technology into a compelling brand story.',       tags: ['Branding', 'Website', 'Product launch'], x: 60,   y: 80  },
  { id: 1, client: 'Sonovein',          blurb: 'Launching a first-in-class device into an established market.',             tags: ['Website', 'Product launch'],              x: 920,  y: 300 },
  { id: 2, client: 'ClearPath Bio',     blurb: 'Positioning a clinical diagnostics platform for Series B.',                tags: ['Brand strategy', 'Pitch narrative'],      x: 320,  y: 560 },
  { id: 3, client: 'Axon Therapeutics', blurb: 'Building a disease awareness campaign from the ground up.',                tags: ['Branding', 'Content', 'Website'],          x: 1260, y: 60  },
]

const CARD_W    = 340
const CARD_H    = 240
const CURSOR_BG = '#7c5cbf'

export default function CanvasSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const zoomWrapRef = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLDivElement>(null)

  const tx         = useRef(0)
  const ty         = useRef(0)
  const dragging   = useRef(false)
  const dragStart  = useRef({ x: 0, y: 0 })
  const originTx   = useRef(0)
  const originTy   = useRef(0)

  const [cursor,  setCursor]  = useState({ x: 0, y: 0, visible: false })
  const [hovered, setHovered] = useState<number | null>(null)
  const [hint,    setHint]    = useState(true)

  // Centre canvas on mount
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const { width, height } = section.getBoundingClientRect()
    tx.current = (width  - (1260 + CARD_W)) / 2
    ty.current = (height - (560  + CARD_H)) / 2
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${tx.current}px, ${ty.current}px)`
    }
  }, [])

  // Scroll-driven zoom in/out
  useEffect(() => {
    const section  = sectionRef.current
    const zoomWrap = zoomWrapRef.current
    if (!section || !zoomWrap) return

    const enterTween = gsap.fromTo(zoomWrap,
      { scale: 0.94 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true } }
    )
    const exitTween = gsap.fromTo(zoomWrap,
      { scale: 1 },
      { scale: 0.94, ease: 'none', scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: true } }
    )

    return () => {
      enterTween.scrollTrigger?.kill()
      exitTween.scrollTrigger?.kill()
    }
  }, [])

  const applyTransform = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${tx.current}px, ${ty.current}px)`
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current  = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    originTx.current  = tx.current
    originTy.current  = ty.current
    setHint(false)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY, visible: true })
    if (!dragging.current) return
    tx.current = originTx.current + (e.clientX - dragStart.current.x)
    ty.current = originTy.current + (e.clientY - dragStart.current.y)
    applyTransform()
  }, [applyTransform])

  const onMouseUp    = useCallback(() => { dragging.current = false }, [])
  const onMouseLeave = useCallback(() => {
    dragging.current = false
    setCursor(c => ({ ...c, visible: false }))
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden select-none"
      style={{
        background:      '#EBEBEB',
        backgroundImage: 'radial-gradient(circle, #b8b8b8 1px, transparent 1px)',
        backgroundSize:  '24px 24px',
        cursor:          dragging.current ? 'grabbing' : 'none',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Section label */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-steel-gray/60" />
        <span className="text-[11px] text-steel-gray uppercase tracking-widest font-medium">Selected Work — Canvas View</span>
      </div>

      {/* Zoom wrapper — GSAP scales this on scroll */}
      <div ref={zoomWrapRef} className="absolute inset-0" style={{ transformOrigin: 'center center' }}>
        {/* Canvas — panned by drag */}
        <div
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ transformOrigin: '0 0', willChange: 'transform' }}
        >
          {CASES.map(c => (
            <CaseCard
              key={c.id}
              c={c}
              hovered={hovered === c.id}
              onHover={() => setHovered(c.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      {/* Custom cursor */}
      {cursor.visible && (
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-1px, -1px)' }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path d="M0 0L0 13L3.5 9.5L6 16.5L8 15.5L5.5 8.5L10 8.5L0 0Z" fill={CURSOR_BG} stroke="white" strokeWidth="0.5" />
          </svg>
          <div
            className="absolute text-white text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ background: CURSOR_BG, top: 13, left: 11 }}
          >
            Guest
          </div>
        </div>
      )}

      {/* Hint */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hint ? 1 : 0 }}
      >
        <span className="text-[12px] text-graphite bg-white/80 px-4 py-1.5 rounded-full shadow-subtle-2">
          Drag to explore
        </span>
      </div>
    </section>
  )
}

function CaseCard({
  c, hovered, onHover, onLeave,
}: {
  c: typeof CASES[0]
  hovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <div
      className="absolute rounded-xl overflow-hidden"
      style={{
        left:       c.x,
        top:        c.y,
        width:      CARD_W,
        height:     CARD_H,
        boxShadow:  hovered ? '0 24px 64px rgba(0,0,0,0.28)' : '0 4px 20px rgba(0,0,0,0.18)',
        transition: 'box-shadow 300ms ease, transform 300ms ease',
        transform:  hovered ? 'scale(1.015)' : 'scale(1)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 h-8 bg-[#2a2a2a] shrink-0">
        {['#ff5f57', '#febc2e', '#28c840'].map((col, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: col }} />
        ))}
        <div className="flex-1 mx-2 bg-[#3a3a3a] rounded text-[9px] text-[#666] px-2 py-0.5 truncate">
          ooho.io/work/{c.client.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>

      {/* Content area */}
      <div className="relative bg-[#1C1C1A]" style={{ height: CARD_H - 32 }}>
        <div className="absolute inset-x-0 top-0 h-7 bg-[#222]" />
        <div className="absolute left-4 top-11 w-[55%] h-2 bg-[#333] rounded" />
        <div className="absolute left-4 top-16 w-[40%] h-2 bg-[#2a2a2a] rounded" />
        <div className="absolute left-4 top-24 w-14 h-5 bg-[#313131] rounded-full" />
        <div className="absolute right-4 top-9 w-[36%] h-[90px] bg-[#252525] rounded-lg" />
        <div className="absolute left-4 bottom-6 right-4 h-[40px] bg-[#212121] rounded-lg" />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4"
          style={{
            background: hovered ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0)',
            transition: 'background 250ms ease',
          }}
        >
          <div
            style={{
              opacity:    hovered ? 1 : 0,
              transform:  hovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 250ms ease, transform 250ms ease',
            }}
          >
            <div className="flex flex-wrap gap-1 mb-2">
              {c.tags.map(tag => (
                <span key={tag} className="text-[10px] text-cloud-white/70 bg-cloud-white/10 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-cloud-white/60 text-[11px] leading-snug mb-1">{c.blurb}</p>
            <p className="text-cloud-white font-semibold text-[14px]">{c.client}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
