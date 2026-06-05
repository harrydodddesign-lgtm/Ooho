import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/ui/Reveal'

type Case = { id: number; client: string; blurb: string; tags: string[] }

const CASES: Case[] = [
  { id: 0, client: 'NanoMosaic',        blurb: 'Turning complex genomics technology into a compelling brand story.',      tags: ['Branding', 'Website', 'Product launch'] },
  { id: 1, client: 'Sonovein',          blurb: 'Launching a first-in-class device into an established market.',            tags: ['Website', 'Product launch'] },
  { id: 2, client: 'ClearPath Bio',     blurb: 'Positioning a clinical diagnostics platform for Series B.',               tags: ['Brand strategy', 'Pitch narrative'] },
  { id: 3, client: 'Axon Therapeutics', blurb: 'Building a disease awareness campaign from the ground up.',               tags: ['Branding', 'Content', 'Website'] },
]

function CaseCard({ c, active, onHover }: { c: Case; active: boolean; onHover: () => void }) {
  return (
    <div
      className="cursor-pointer"
      style={{
        opacity:    active ? 1 : 0.35,
        transition: 'opacity 400ms ease',
      }}
      onMouseEnter={onHover}
    >
      <div
        className="relative rounded-2xl bg-[#1C1C1A] overflow-hidden mb-3"
        style={{ height: 'clamp(280px, 40vh, 480px)' }}
      >
        <div
          className="absolute top-4 left-4 flex flex-wrap gap-2"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 300ms ease' }}
        >
          {c.tags.map(tag => (
            <span key={tag} className="text-[12px] text-cloud-white/70 bg-cloud-white/10 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-4 right-4"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 300ms ease' }}
        >
          <button className="flex items-center gap-2 bg-cloud-white/10 hover:bg-cloud-white/20 text-cloud-white text-[14px] font-medium rounded-full px-4 py-2 transition-colors duration-150">
            <span className="w-2 h-2 rounded-full bg-cloud-white shrink-0" />
            Talk to us
          </button>
        </div>
      </div>

      <p className="text-[13px] text-cloud-white/40 mb-1 leading-snug">{c.blurb}</p>
      <p
        className="font-medium"
        style={{
          fontSize: 20,
          color:      active ? '#ffffff' : '#71717a',
          transition: 'color 400ms ease',
        }}
      >
        {c.client}
      </p>
    </div>
  )
}

export default function WorkSection({ onThemeChange }: { onThemeChange: (t: 'light' | 'dark') => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const bgTween = gsap.fromTo(
      section,
      { backgroundColor: '#ffffff' },
      {
        backgroundColor: '#09090b',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end:   'top top',
          scrub: true,
        },
      }
    )

    const themeST = ScrollTrigger.create({
      trigger:     section,
      start:       'top 40%',
      onEnter:     () => onThemeChange('light'),
      onLeaveBack: () => onThemeChange('dark'),
    })

    return () => {
      bgTween.scrollTrigger?.kill()
      themeST.kill()
    }
  }, [onThemeChange])

  return (
    <section ref={sectionRef} className="relative px-6 pt-24 pb-32">

      {/* Section header */}
      <div className="mb-16">
        <Reveal className="flex items-center gap-2 mb-8">
          <span className="w-[6px] h-[6px] rounded-full bg-cloud-white/40" />
          <span className="text-[11px] text-cloud-white/40 uppercase tracking-widest font-medium">Selected Work</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-12 items-end">
          <Reveal>
            <h2
              className="text-cloud-white font-bold"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
            >
              Trusted by 100+ life sciences and medtech companies across US & EU.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-cloud-white/50 text-[15px] leading-relaxed max-w-sm">
              From industry-refining product launches to global expansion, see how we've
              helped companies like yours achieve growth.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grid — columns animate on X axis when active card changes */}
      <div className="flex flex-col gap-4">
        {[[0,1],[2,3]].map(([a, b]) => {
          const cols = activeCard === a ? '2fr 1fr' : activeCard === b ? '1fr 2fr' : '1fr 1fr'
          return (
            <div
              key={a}
              className="grid gap-4"
              style={{ gridTemplateColumns: cols, transition: 'grid-template-columns 450ms ease' }}
            >
              <CaseCard c={CASES[a]} active={activeCard === a} onHover={() => setActiveCard(a)} />
              <CaseCard c={CASES[b]} active={activeCard === b} onHover={() => setActiveCard(b)} />
            </div>
          )
        })}
      </div>

    </section>
  )
}
