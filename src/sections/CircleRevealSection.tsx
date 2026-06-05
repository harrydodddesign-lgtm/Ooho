import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CircleRevealSection() {
  const wrapperRef     = useRef<HTMLDivElement>(null)
  const stickyRef      = useRef<HTMLDivElement>(null)
  const leftRingRef    = useRef<HTMLDivElement>(null)
  const rightRingRef   = useRef<HTMLDivElement>(null)
  const fillRef        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const sticky  = stickyRef.current
    if (!wrapper || !sticky) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start:   'top top',
        end:     '+=280%',
        scrub:   1,
        pin:     sticky,
      },
    })

    // Phase 1 (0 → 0.45): rings slide from sides to centre
    tl.fromTo(leftRingRef.current,
      { x: '-58vw' },
      { x: 0, ease: 'none', duration: 0.45 },
      0
    )
    tl.fromTo(rightRingRef.current,
      { x: '58vw' },
      { x: 0, ease: 'none', duration: 0.45 },
      0
    )

    // Phase 2 (0.4 → 0.55): rings fade as fill takes over
    tl.to([leftRingRef.current, rightRingRef.current],
      { opacity: 0, duration: 0.12, ease: 'none' },
      0.4
    )

    // Phase 2 (0.42 → 1.0): fill circle blooms to cover full screen
    tl.fromTo(fillRef.current,
      { scale: 0, opacity: 1 },
      { scale: 8, ease: 'power2.in', duration: 0.58 },
      0.42
    )

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, [])

  const SIZE = 'min(58vh, 58vw)'

  return (
    <div ref={wrapperRef} style={{ height: '380vh' }} className="relative">
      <div
        ref={stickyRef}
        className="h-screen bg-cloud-white relative flex items-center justify-center overflow-hidden"
      >
        {/* Left ring */}
        <div
          ref={leftRingRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  SIZE,
            height: SIZE,
            border: '1.5px solid rgba(0,0,0,0.12)',
          }}
        />

        {/* Right ring */}
        <div
          ref={rightRingRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  SIZE,
            height: SIZE,
            border: '1.5px solid rgba(0,0,0,0.12)',
          }}
        />

        {/* Fill circle — blooms to reveal dark section */}
        <div
          ref={fillRef}
          className="absolute rounded-full bg-midnight-ink pointer-events-none"
          style={{
            width:  SIZE,
            height: SIZE,
            transform: 'scale(0)',
          }}
        />
      </div>
    </div>
  )
}
