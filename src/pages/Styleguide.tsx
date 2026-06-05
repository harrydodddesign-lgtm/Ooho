const weights = [
  { label: 'Light', value: '300' },
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'SemiBold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'ExtraBold', value: '800' },
]

const typeScale = [
  { token: 'display',    size: '64px', lh: '1.00', ls: '0',        sample: 'Display' },
  { token: 'display-sm', size: '56px', lh: '1.12', ls: '0',        sample: 'Display Small' },
  { token: 'heading-lg', size: '40px', lh: '1.25', ls: '0',        sample: 'Heading Large' },
  { token: 'heading',    size: '32px', lh: '1.28', ls: '0',        sample: 'Heading' },
  { token: 'subheading', size: '18px', lh: '1.64', ls: '0',        sample: 'Subheading' },
  { token: 'body-lg',    size: '16px', lh: '1.62', ls: '0',        sample: 'Body Large — lead copy and introductions' },
  { token: 'body',       size: '14px', lh: '1.56', ls: '0',        sample: 'Body — standard paragraph text' },
  { token: 'label',      size: '15px', lh: '1.50', ls: '0.12em',   sample: 'LABEL — CAPS NAV & CATEGORIES' },
  { token: 'caption',    size: '10px', lh: '1.50', ls: '0',        sample: 'Caption — fine print and meta' },
]

const colors = [
  { token: 'midnight-ink',    hex: '#09090b', bg: 'bg-midnight-ink',    text: 'text-cloud-white' },
  { token: 'jet-black',       hex: '#18181b', bg: 'bg-jet-black',       text: 'text-cloud-white' },
  { token: 'graphite',        hex: '#3f3f46', bg: 'bg-graphite',        text: 'text-cloud-white' },
  { token: 'steel-gray',      hex: '#71717a', bg: 'bg-steel-gray',      text: 'text-cloud-white' },
  { token: 'silver-mist',     hex: '#a1a1aa', bg: 'bg-silver-mist',     text: 'text-midnight-ink' },
  { token: 'faded-gray',      hex: '#d4d4d8', bg: 'bg-faded-gray',      text: 'text-midnight-ink' },
  { token: 'whisper-gray',    hex: '#ececee', bg: 'bg-whisper-gray',    text: 'text-midnight-ink', border: true },
  { token: 'canvas-white',    hex: '#f4f4f5', bg: 'bg-canvas-white',    text: 'text-midnight-ink', border: true },
  { token: 'cloud-white',     hex: '#ffffff', bg: 'bg-cloud-white',     text: 'text-midnight-ink', border: true },
  { token: 'vibrant-magenta', hex: '#fe45e2', bg: 'bg-vibrant-magenta', text: 'text-cloud-white' },
  { token: 'ember-glow',      hex: '#ff5a00', bg: 'bg-ember-glow',      text: 'text-cloud-white' },
]

const spacing = [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 120]

export default function Styleguide() {
  return (
    <div className="min-h-screen bg-cloud-white text-midnight-ink px-8 py-16">
      <div className="max-w-[1200px] mx-auto space-y-24">

        {/* Header */}
        <div>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-4">Ooho Design System</p>
          <h1 className="text-display font-bold">Styleguide</h1>
        </div>

        {/* Type Scale */}
        <section>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-8 pb-4 border-b border-silver-mist/30">Typography</p>
          <div className="space-y-8">
            {typeScale.map(({ token, size, lh, ls, sample }) => (
              <div key={token} className="flex items-baseline gap-8 border-b border-silver-mist/20 pb-6">
                <div className="w-32 shrink-0">
                  <p className="text-[15px] text-steel-gray">{token}</p>
                  <p className="text-[13px] text-silver-mist">{size} / {lh}</p>
                </div>
                <p
                  className="font-semibold"
                  style={{ fontSize: size, lineHeight: lh, letterSpacing: ls }}
                >
                  {sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Weights */}
        <section>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-8 pb-4 border-b border-silver-mist/30">Font Weights — Archivo</p>
          <div className="flex flex-wrap gap-8">
            {weights.map(({ label, value }) => (
              <div key={value}>
                <p
                  className="text-heading-lg"
                  style={{ fontWeight: value }}
                >
                  Ag
                </p>
                <p className="text-label text-steel-gray mt-2">{label}</p>
                <p className="text-label text-silver-mist">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-8 pb-4 border-b border-silver-mist/30">Colors</p>
          <div className="flex flex-wrap gap-4">
            {colors.map(({ token, hex, bg, border }) => (
              <div key={token} className="w-40">
                <div
                  className={`h-24 rounded-xl ${bg} ${border ? 'border border-silver-mist/40' : ''} mb-3`}
                />
                <p className="text-body font-semibold">{token}</p>
                <p className="text-label text-steel-gray uppercase">{hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-8 pb-4 border-b border-silver-mist/30">Spacing — 4px grid</p>
          <div className="flex items-end gap-4 flex-wrap">
            {spacing.map((val) => (
              <div key={val} className="flex flex-col items-center gap-2">
                <div
                  className="bg-midnight-ink rounded-sm"
                  style={{ width: `${Math.min(val, 80)}px`, height: `${Math.min(val, 80)}px` }}
                />
                <p className="text-label text-steel-gray">{val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section>
          <p className="text-label uppercase tracking-widest text-steel-gray mb-8 pb-4 border-b border-silver-mist/30">Border Radius</p>
          <div className="flex gap-8 items-end flex-wrap">
            {[
              { label: 'badges / inputs / buttons', r: '12px', tw: 'rounded-badges' },
              { label: 'cards-sm', r: '28px', tw: 'rounded-cards-sm' },
              { label: 'cards', r: '36px', tw: 'rounded-cards' },
              { label: 'icon containers', r: '40px', tw: 'rounded-icon' },
              { label: 'image masks', r: '48px', tw: 'rounded-image-masks' },
              { label: 'large elements', r: '64px', tw: 'rounded-elements-lg' },
            ].map(({ label, r, tw }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className={`w-24 h-24 bg-midnight-ink ${tw}`} />
                <p className="text-body font-semibold text-center max-w-[96px]">{label}</p>
                <p className="text-label text-steel-gray">{r}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
