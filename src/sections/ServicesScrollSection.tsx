import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    tag:   'Brand Strategy',
    title: 'Build a position\nno one can copy.',
    body:  'We define where you sit in the market, who you\'re talking to, and why they should care — before a single pixel is designed. Sharp messaging, clear differentiation, durable positioning.',
  },
  {
    tag:   'Visual Identity',
    title: 'A brand that\nfeels as good as it works.',
    body:  'Logo systems, colour, type, motion. We design identities that hold up from investor decks to trade show stands — built for life science, not borrowed from it.',
  },
  {
    tag:   'Website Design & Build',
    title: 'Your site as a\ngrowth engine.',
    body:  'We design and build in Webflow — fast, editable, SEO-ready. Every page earns its place. Every word is written for the audience, not the committee.',
  },
  {
    tag:   'Science Communication',
    title: 'Complex science,\ncompelling story.',
    body:  'PhD-level writers who understand your data and your audience. We turn MOAs, white papers and clinical data into narratives that move people to act.',
  },
  {
    tag:   'Product Launch',
    title: 'Launch with\nmomentum, not noise.',
    body:  'From pre-launch positioning to launch-day execution. We build the assets, messaging and channels that make your launch land — and stick.',
  },
  {
    tag:   'Demand Generation',
    title: 'Pipeline, not\njust awareness.',
    body:  'Paid, organic, outbound. We build systems that bring the right people in and keep them moving. Strategy, execution and measurement — under one roof.',
  },
]

// Arc geometry — cards sit on a large circle, giving a wheel feel
const STEP    = 300  // vertical px between card centres
const ARC_R   = 320  // tighter radius = more dramatic outward curve

function arcX(y: number) {
  // Cards arc to the LEFT as they move above/below the active one
  return -(y * y) / (2 * ARC_R)
}

function cardProps(diff: number) {
  const y        = diff * STEP
  const x        = arcX(y)
  const absDiff  = Math.abs(diff)
  const scale    = Math.max(0.75, 1 - absDiff * 0.08)
  const opacity  = absDiff === 0 ? 1 : absDiff === 1 ? 0.4 : absDiff === 2 ? 0.18 : 0
  const rotationX = diff * -22  // 3D drum/cylinder tilt — top card leans back, bottom leans forward
  return { x, y, scale, opacity, rotationX }
}

export default function ServicesScrollSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const stickyRef   = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const bodyRef     = useRef<HTMLParagraphElement>(null)
  const tagRef      = useRef<HTMLSpanElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const activeRef   = useRef(0)
  const prevRef     = useRef(0)
  const tlRef       = useRef<gsap.core.Timeline | null>(null)

  // Animate all cards to their arc positions for a given active index
  function animateWheel(idx: number, duration = 0.55) {
    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i]
      if (!card) return
      const { x, y, scale, opacity, rotationX } = cardProps(i - idx)
      gsap.to(card, { x, y, scale, opacity, rotationX, transformPerspective: 700, duration, ease: 'power3.out' })
    })
  }

  useEffect(() => {
    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i]
      if (!card) return
      const { x, y, scale, opacity, rotationX } = cardProps(i - 0)
      gsap.set(card, { x, y, scale, opacity, rotationX, transformPerspective: 700 })
    })

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start:   'top top',
      end:     'bottom bottom',
      pin:     stickyRef.current!,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * SERVICES.length),
          SERVICES.length - 1
        )
        if (idx === activeRef.current) return

        const direction = idx > prevRef.current ? 1 : -1
        prevRef.current  = idx
        activeRef.current = idx
        setActive(idx)

        // Text transition
        const els = [titleRef.current, bodyRef.current, tagRef.current].filter(Boolean)
        if (tlRef.current) tlRef.current.kill()
        const tl = gsap.timeline()
        tlRef.current = tl

        tl.to(els, { opacity: 0, y: direction * -14, duration: 0.18, ease: 'power3.in', stagger: 0.03 })
          .call(() => {
            if (titleRef.current) titleRef.current.innerHTML  = SERVICES[idx].title.replace('\n', '<br/>')
            if (bodyRef.current)  bodyRef.current.textContent = SERVICES[idx].body
            if (tagRef.current)   tagRef.current.textContent  = SERVICES[idx].tag
            gsap.set(els, { y: direction * 14 })
          })
          .to(els, { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out', stagger: 0.04 })

        // Wheel rotation
        animateWheel(idx)
      },
    })

    return () => { st.kill(); tlRef.current?.kill() }
  }, [])

  const svc = SERVICES[0]

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${SERVICES.length * 100}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="h-screen bg-midnight-ink flex items-center overflow-hidden"
      >
        {/* Dot nav — left edge */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width:           i === active ? 8 : 5,
                height:          i === active ? 8 : 5,
                backgroundColor: i === active ? '#ffffff' : 'rgba(255,255,255,0.18)',
                transition:      'all 350ms ease',
              }}
            />
          ))}
        </div>

        {/* Left — text */}
        <div className="flex flex-col justify-center px-16 w-[44%] shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cloud-white/30" />
            <span ref={tagRef} className="text-[11px] text-cloud-white/50 uppercase tracking-widest font-medium">
              {svc.tag}
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-cloud-white font-bold mb-6"
            style={{ fontSize: 'clamp(28px, 2.8vw, 46px)', lineHeight: '1.1', letterSpacing: '-0.025em' }}
            dangerouslySetInnerHTML={{ __html: svc.title.replace('\n', '<br/>') }}
          />

          <p ref={bodyRef} className="text-cloud-white/50 text-[15px] leading-relaxed max-w-[360px]">
            {svc.body}
          </p>
        </div>

        {/* Right — arc carousel */}
        <div className="flex-1 relative h-full flex items-center justify-center overflow-hidden">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              className="absolute rounded-2xl bg-[#1e1e22]"
              style={{
                width:       'clamp(260px, 30vw, 440px)',
                aspectRatio: '4/3',
                willChange:  'transform, opacity',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
