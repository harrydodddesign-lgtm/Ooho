import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTARevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleRef  = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const circle  = circleRef.current
    const text    = textRef.current
    if (!section || !circle || !text) return

    gsap.set(text, { x: '100vw', opacity: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top top',
        end:     '+=220%',
        scrub:   1,
        pin:     true,
      },
    })

    tl
      .fromTo(circle,
        { y: '55vh', scale: 0.08 },
        { y: 0, scale: 1, ease: 'power2.inOut', duration: 0.6 }
      )
      .to(text,
        { x: 0, ease: 'power2.out', duration: 0.5 },
        0.5
      )

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-cloud-white"
    >
      <div
        ref={circleRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width:      'max(220vw, 220vh)',
          height:     'max(220vw, 220vh)',
          background: 'radial-gradient(circle at 45% 55%, #7c3aed 0%, #9d174d 38%, #0a0010 72%, #000000 100%)',
          willChange: 'transform',
        }}
      />

      <div ref={textRef} className="relative z-10 px-10 md:px-20">
        <p className="text-cloud-white/60 text-[13px] font-medium tracking-widest uppercase mb-4">
          Let's build something
        </p>
        <h2
          className="text-cloud-white font-bold"
          style={{
            fontSize:      'clamp(40px, 6vw, 88px)',
            lineHeight:    '1.04',
            letterSpacing: '-0.03em',
          }}
        >
          Ready to work<br />
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>with us?</span>
        </h2>
      </div>
    </div>
  )
}
