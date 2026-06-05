import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/ui/Reveal'

const SERVICES = [
  'Brand & web development',
  'Demand generation',
  'Science communication',
  'Product launch',
]

export default function ServicesSection({ onThemeChange }: { onThemeChange: (t: 'light' | 'dark') => void }) {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const themeST = ScrollTrigger.create({
      trigger:     section,
      start:       'top 60%',
      onEnter:     () => onThemeChange('dark'),
      onLeaveBack: () => onThemeChange('light'),
    })

    return () => { themeST.kill() }
  }, [onThemeChange])

  return (
    <section ref={sectionRef} className="min-h-screen bg-cloud-white flex flex-col justify-center px-8 py-24">

      <Reveal className="flex items-center gap-2 mb-16">
        <span className="w-[6px] h-[6px] rounded-full bg-steel-gray/60" />
        <span className="text-[11px] text-steel-gray uppercase tracking-widest font-medium">What we do</span>
      </Reveal>

      <div className="flex items-center gap-8">

        {/* Service list */}
        <div className="flex-1 flex flex-col">
          {SERVICES.map((name, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="cursor-default py-1"
                onMouseEnter={() => setActive(i)}
              >
                <span
                  className="font-bold block leading-[1.05] tracking-tight"
                  style={{
                    fontSize:   'clamp(40px, 5vw, 68px)',
                    color:      i === active ? '#09090b' : '#d4d4d8',
                    transition: 'color 300ms ease',
                  }}
                >
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Image placeholder */}
        <div
          className="shrink-0 rounded-2xl bg-silver-mist/30"
          style={{ width: 'clamp(280px, 35vw, 480px)', aspectRatio: '4/5' }}
        />

      </div>
    </section>
  )
}
