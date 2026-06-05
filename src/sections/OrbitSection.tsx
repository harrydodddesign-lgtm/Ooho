import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RING = 'min(106vh, 106vw)'

export default function OrbitSection({ onThemeChange }: { onThemeChange: (t: 'light' | 'dark') => void }) {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const textRef      = useRef<HTMLDivElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const leftRingRef  = useRef<HTMLDivElement>(null)
  const rightRingRef = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const [dotActive, setDotActive] = useState(false)

  // Mouse parallax quickTo refs
  const qLeftY  = useRef<((v: number) => void) | null>(null)
  const qRightY = useRef<((v: number) => void) | null>(null)
  const qLeftX  = useRef<((v: number) => void) | null>(null)
  const qRightX = useRef<((v: number) => void) | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.set([leftRingRef.current, rightRingRef.current], { borderColor: 'rgba(0,0,0,0.12)' })

    // ── Phase 1: entry (no pin) ──────────────────────────────────────────────
    // Rings converge partway — still moving toward each other when pin kicks in.
    const entrySTs: ScrollTrigger[] = []

    entrySTs.push(
      ScrollTrigger.create({
        animation: gsap.fromTo(leftRingRef.current, { x: '-52vw' }, { x: '-16vw', ease: 'power2.inOut' }),
        trigger: section, start: 'top bottom', end: 'top top', scrub: true,
      }),
      ScrollTrigger.create({
        animation: gsap.fromTo(rightRingRef.current, { x: '52vw' }, { x: '16vw', ease: 'power2.inOut' }),
        trigger: section, start: 'top bottom', end: 'top top', scrub: true,
      }),
      ScrollTrigger.create({
        animation: gsap.fromTo(contentRef.current,
          { filter: 'blur(12px)', opacity: 0 },
          { filter: 'blur(10px)', opacity: 0.15, ease: 'power2.out' }
        ),
        trigger: section, start: 'top bottom', end: 'top top', scrub: true,
      })
    )

    // ── Phase 2: pin — rings finish converging, hold, cross, go dark ────────
    const lastTheme = { current: 'dark' as 'light' | 'dark' }

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger:  section,
        start:    'top top',
        end:      () => `+=${window.innerHeight * 0.8}`,
        scrub:    0.4,
        pin:      true,
        onEnter:      () => setDotActive(true),
        onLeaveBack:  () => setDotActive(false),
        onUpdate: (self) => {
          const theme = self.progress > 0.60 ? 'light' : 'dark'
          if (theme !== lastTheme.current) {
            lastTheme.current = theme
            onThemeChange(theme)
          }
        },
      },
    })

    // Rings finish converging — to() picks up live position from Phase 1  (0 → 30%)
    pinTl.to(leftRingRef.current,  { x: 0, ease: 'power2.inOut', duration: 0.30 }, 0)
    pinTl.to(rightRingRef.current, { x: 0, ease: 'power2.inOut', duration: 0.30 }, 0)

    // Content finishes unblurring  (0 → 38%)
    pinTl.to(contentRef.current,
      { filter: 'blur(0px)', opacity: 1, ease: 'power2.out', duration: 0.38 },
      0
    )

    // Hold at center  (30 → 42%)
    pinTl.to({}, { duration: 0.12 }, 0.30)

    // Rings cross to opposite sides  (42 → 100%)
    pinTl.to(leftRingRef.current,  { x: '52vw',  ease: 'power2.inOut', duration: 0.58 }, 0.42)
    pinTl.to(rightRingRef.current, { x: '-52vw', ease: 'power2.inOut', duration: 0.58 }, 0.42)

    // Border → white as rings cross
    pinTl.to(
      [leftRingRef.current, rightRingRef.current],
      { borderColor: 'rgba(255,255,255,0.45)', ease: 'none', duration: 0.58 },
      0.42
    )

    // Content fades out as crossing begins  (42 → 60%)
    pinTl.to(contentRef.current, { opacity: 0, ease: 'power2.in', duration: 0.18 }, 0.42)

    // Dark overlay — late and fast  (68 → 100%)
    pinTl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, ease: 'power2.in', duration: 0.32 }, 0.68)

    // Mouse parallax — y is free (scroll only drives x), x is a gentle nudge
    if (leftRingRef.current && rightRingRef.current) {
      qLeftY.current  = gsap.quickTo(leftRingRef.current,  'y', { duration: 0.9, ease: 'power3.out' })
      qRightY.current = gsap.quickTo(rightRingRef.current, 'y', { duration: 0.9, ease: 'power3.out' })
      qLeftX.current  = gsap.quickTo(leftRingRef.current,  'x', { duration: 0.9, ease: 'power3.out' })
      qRightX.current = gsap.quickTo(rightRingRef.current, 'x', { duration: 0.9, ease: 'power3.out' })
    }

    return () => {
      entrySTs.forEach(st => st.kill())
      pinTl.scrollTrigger?.kill()
      pinTl.kill()
    }
  }, [onThemeChange])

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-cloud-white relative flex items-center justify-center overflow-hidden"
      style={{ zIndex: 1, isolation: 'isolate' }}
    >
      {/* Left ring */}
      <div
        ref={leftRingRef}
        className="absolute rounded-full pointer-events-none"
        style={{ width: RING, height: RING, borderWidth: '1.5px', borderStyle: 'solid', zIndex: 30 }}
      />

      {/* Right ring */}
      <div
        ref={rightRingRef}
        className="absolute rounded-full pointer-events-none"
        style={{ width: RING, height: RING, borderWidth: '1.5px', borderStyle: 'solid', zIndex: 30 }}
      />

      {/* Content — radial halo + text */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 40 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 42% 48% at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div ref={textRef} className="relative text-center max-w-[520px] px-8">
          <div ref={tagRef} className="inline-flex items-center gap-2 rounded-full border border-faded-gray bg-cloud-white px-4 py-1.5 mb-6">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: dotActive ? '#a855f7' : '#d4d4d8' }}
            />
            <span className="text-[13px] text-graphite font-medium">Who we are</span>
          </div>
          <h2
            className="font-semibold text-midnight-ink mb-5"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: '1.05', letterSpacing: '-0.02em' }}
          >
            Complexity,<br />meet creativity.
          </h2>
          <p className="text-[15px] text-steel-gray leading-relaxed">
            We've perfected the art of making complexity, compelling. You'll never waste
            time "educating the agency," and you'll never worry that your story is being
            simplified into something it's not. Your story gets distilled by PhD-level
            scientists who understand your science and your audience.
          </p>
        </div>
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-midnight-ink pointer-events-none"
        style={{ opacity: 0, zIndex: 20 }}
      />
    </section>
  )
}
