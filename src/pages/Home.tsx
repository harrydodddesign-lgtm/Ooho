import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import OrbitSection from '../sections/OrbitSection'
import WorkSection from '../sections/WorkSection'
import ServicesSection from '../sections/ServicesSection'
import BentoSection from '../sections/BentoSection'
import CTARevealSection from '../sections/CTARevealSection'
import ServicesScrollSection from '../sections/ServicesScrollSection'

const LOGOS = ['NanoMosaic', 'Sonovein', 'ClearPath Bio', 'Axon Tx', 'Waterline', 'Blooms', 'Arch+', 'Scientific']

function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let raf: number
    const tick = () => {
      x -= 0.5
      const half = track.scrollWidth / 2
      if (Math.abs(x) >= half) x = 0
      track.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const items = [...LOGOS, ...LOGOS]

  return (
    <div className="relative pb-8 overflow-hidden" style={{
      maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
    }}>
      <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap" style={{ willChange: 'transform' }}>
        {items.map((logo, i) => (
          <span key={i} className="text-cloud-white/40 text-[13px] font-medium tracking-widest uppercase shrink-0">
            {logo}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 70) setHeaderTheme('dark')
      else if (y < window.innerHeight * 0.35) setHeaderTheme('light')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex flex-col overflow-x-hidden">

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
        <span
          className="font-bold text-[22px] tracking-tight"
          style={{
            color:      headerTheme === 'light' ? '#ffffff' : '#09090b',
            transition: 'color 300ms ease',
          }}
        >
          Ooho
        </span>
        <Nav theme={headerTheme} />
      </header>

      {/* Shared bg — hero + orbit share paper background so orbit cards bleed across */}
      <div className="relative pt-[70px] z-[2]">

        <main
          className="mx-4 mb-4 rounded-md overflow-hidden relative bg-midnight-ink z-10"
          style={{ height: 'calc(100vh - 86px)' }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-t from-midnight-ink/80 via-midnight-ink/10 to-transparent" />

          {/* Gradient blur only — no colour wash */}
          {[
            { blur: '2px',  height: '35%', from: '0%',  to: '20%' },
            { blur: '6px',  height: '35%', from: '8%',  to: '30%' },
            { blur: '12px', height: '35%', from: '18%', to: '45%' },
            { blur: '20px', height: '35%', from: '30%', to: '60%' },
            { blur: '32px', height: '35%', from: '45%', to: '80%' },
          ].map(({ blur, height, from, to }, i) => (
            <div
              key={i}
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height,
                backdropFilter:       `blur(${blur})`,
                WebkitBackdropFilter: `blur(${blur})`,
                maskImage:            `linear-gradient(to top, black ${from}, transparent ${to})`,
                WebkitMaskImage:      `linear-gradient(to top, black ${from}, transparent ${to})`,
              }}
            />
          ))}

          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 flex items-center px-10">
              <div className="max-w-4xl">
                <Reveal className="mb-5">
                  <h1
                    className="text-cloud-white"
                    style={{
                      fontFamily: "'Geist Circle', monospace",
                      fontWeight: 400,
                      fontSize: '6rem',
                      lineHeight: '1.0',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Building growth<br />
                    engines for<br />
                    <span className="text-cloud-white/60">life science.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.1} className="mb-7">
                  <p className="text-cloud-white/60 text-[15px] leading-relaxed max-w-[480px]">
                    We combine scientists, creatives and growth operators —
                    turning complex technologies into clear, compelling market stories.
                  </p>
                </Reveal>
                <Reveal delay={0.2} className="flex">
                  <div className="flex items-center gap-3">
                    <Button variant="primary">View Our Work</Button>
                    <Button variant="ghost">Start a Project</Button>
                  </div>
                </Reveal>
              </div>
            </div>

            <LogoMarquee />
          </div>
        </main>

      </div>

      <OrbitSection onThemeChange={setHeaderTheme} />

      <WorkSection onThemeChange={setHeaderTheme} />

      <ServicesScrollSection />

      <BentoSection />

<CTARevealSection />

      <ServicesSection onThemeChange={setHeaderTheme} />

    </div>
  )
}
