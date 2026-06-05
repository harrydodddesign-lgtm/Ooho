import Reveal from '../components/ui/Reveal'

const TESTIMONIALS = [
  {
    quote: "Ooho took our complex genomics platform and turned it into a story our investors and customers actually understood. The brand they built is world-class.",
    name: "Sarah Chen",
    title: "CEO, NanoMosaic",
    initials: "SC",
  },
  {
    quote: "We launched into a crowded market and stood out immediately. The positioning work was surgical — they knew exactly what would resonate with interventional radiologists.",
    name: "James Whitfield",
    title: "VP Marketing, Sonovein",
    initials: "JW",
  },
]

const TAGS = [
  'Brand strategy', 'Visual identity', 'Website design',
  'Science communication', 'Product launch', 'Pitch narrative',
  'Demand generation', 'Content marketing', 'SEO',
]

export default function BentoSection() {
  return (
    <section className="bg-cloud-white px-6 py-24">

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-12">
          <Reveal className="inline-flex items-center gap-2 mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-steel-gray/60" />
            <span className="text-[11px] text-steel-gray uppercase tracking-widest font-medium">Why Ooho</span>
          </Reveal>
          <Reveal>
            <h2
              className="font-bold text-midnight-ink"
              style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
            >
              Why teams choose Ooho
            </h2>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: '1fr 1.35fr 1fr', gridTemplateRows: 'auto auto auto' }}
        >

          {/* ── LEFT COLUMN ── */}

          {/* L1 — Stat: clients */}
          <div className="bg-canvas-white rounded-cards p-7 flex flex-col justify-between" style={{ minHeight: 160 }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-midnight-ink" style={{ fontSize: 40, lineHeight: 1.1 }}>100+</p>
                <p className="text-graphite text-[15px] mt-1">Life science & medtech clients</p>
              </div>
              <div className="w-10 h-10 rounded-icon bg-whisper-gray flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-graphite">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {['US', 'EU', 'UK', 'AU'].map(r => (
                <span key={r} className="text-[11px] text-silver-mist font-medium tracking-wide">{r}</span>
              ))}
            </div>
          </div>

          {/* CENTER — spans 3 rows */}
          <div
            className="bg-midnight-ink rounded-cards p-8 flex flex-col justify-between row-span-3"
            style={{ minHeight: 540 }}
          >
            <div>
              <span className="inline-block bg-cloud-white/10 text-cloud-white/70 text-[11px] uppercase tracking-widest px-3 py-1 rounded-badges mb-8">
                Client story
              </span>
              <p
                className="text-cloud-white font-medium leading-snug"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                "{TESTIMONIALS[0].quote}"
              </p>
            </div>

            <div>
              <div className="w-px h-12 bg-cloud-white/15 mb-6" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-whisper-gray/20 flex items-center justify-center text-cloud-white text-[13px] font-semibold">
                  {TESTIMONIALS[0].initials}
                </div>
                <div>
                  <p className="text-cloud-white text-[14px] font-medium">{TESTIMONIALS[0].name}</p>
                  <p className="text-cloud-white/50 text-[13px]">{TESTIMONIALS[0].title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* R1 — Stat: geography */}
          <div className="bg-canvas-white rounded-cards p-7 flex flex-col justify-between" style={{ minHeight: 160 }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-midnight-ink" style={{ fontSize: 40, lineHeight: 1.1 }}>US & EU</p>
                <p className="text-graphite text-[15px] mt-1">Markets served</p>
              </div>
              <div className="w-10 h-10 rounded-icon bg-whisper-gray flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-graphite">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* L2 — Testimonial quote */}
          <div className="bg-whisper-gray rounded-cards p-7 flex flex-col justify-between" style={{ minHeight: 200 }}>
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-silver-mist mb-4 shrink-0">
              <path d="M0 18V10.8C0 4.68 3.36 1.2 10.08 0l1.44 2.16C8.16 3 6.24 4.92 5.76 7.92H10.08V18H0zm13.92 0V10.8C13.92 4.68 17.28 1.2 24 0l1.44 2.16C22.08 3 20.16 4.92 19.68 7.92H24V18H13.92z" fill="currentColor"/>
            </svg>
            <p className="text-graphite text-[15px] leading-relaxed flex-1">
              {TESTIMONIALS[1].quote}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-8 h-8 rounded-full bg-faded-gray flex items-center justify-center text-graphite text-[12px] font-semibold">
                {TESTIMONIALS[1].initials}
              </div>
              <div>
                <p className="text-midnight-ink text-[13px] font-medium">{TESTIMONIALS[1].name}</p>
                <p className="text-silver-mist text-[12px]">{TESTIMONIALS[1].title}</p>
              </div>
            </div>
          </div>

          {/* R2 — Service tags */}
          <div className="bg-canvas-white rounded-cards p-7" style={{ minHeight: 200 }}>
            <p className="text-[11px] text-steel-gray uppercase tracking-widest mb-5 font-medium">What we do</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="text-[13px] px-3 py-1 rounded-badges border"
                  style={{
                    background: i === 1 ? '#09090b' : 'transparent',
                    color:      i === 1 ? '#ffffff' : '#3f3f46',
                    borderColor: i === 1 ? '#09090b' : '#d4d4d8',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* L3 — Dark stat card */}
          <div
            className="rounded-cards p-7 flex flex-col justify-between"
            style={{ minHeight: 160, background: '#09090b' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-cloud-white" style={{ fontSize: 40, lineHeight: 1.1 }}>PhD</p>
                <p className="text-cloud-white/60 text-[15px] mt-1">Scientists on every brief</p>
              </div>
              <div className="w-10 h-10 rounded-icon bg-white/10 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cloud-white/70">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* R3 — CTA card */}
          <div className="bg-canvas-white rounded-cards p-7 flex flex-col justify-between" style={{ minHeight: 160 }}>
            <p className="text-midnight-ink font-semibold text-[18px] leading-snug">
              From strategy<br />to launch in weeks
            </p>
            <button
              className="mt-5 self-start inline-flex items-center gap-2 bg-midnight-ink text-cloud-white text-[14px] font-medium px-5 py-2.5 rounded-buttons transition-opacity hover:opacity-75"
            >
              Book a call
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
