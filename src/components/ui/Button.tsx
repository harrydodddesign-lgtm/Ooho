import { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  if (variant === 'ghost') {
    return (
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[15px] font-medium border overflow-hidden cursor-pointer ${className}`}
        style={{ borderColor: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', transition: 'border-color 0.3s ease' }}
        {...props}
      >
        {/* Fill blob */}
        <span
          aria-hidden
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#ffffff',
            transform: `translate(-50%, -50%) scale(${hovered ? 25 : 0})`,
            transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        />
        {/* Dot */}
        <span
          aria-hidden
          style={{
            position: 'relative', zIndex: 1, flexShrink: 0,
            width: 8, height: 8, borderRadius: '50%', display: 'block',
            backgroundColor: hovered ? '#09090b' : 'rgba(255,255,255,0.35)',
            transition: 'background-color 0.25s ease',
          }}
        />
        {/* Label */}
        <span style={{ position: 'relative', zIndex: 1, color: hovered ? '#09090b' : '#ffffff', transition: 'color 0.25s ease' }}>
          {children}
        </span>
      </button>
    )
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium bg-cloud-white overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      {/* Fill blob */}
      <span
        aria-hidden
        style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: '#09090b',
          transform: `translate(-50%, -50%) scale(${hovered ? 25 : 0})`,
          transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      />
      {/* Dot */}
      <span
        aria-hidden
        style={{
          position: 'relative', zIndex: 1, flexShrink: 0,
          width: 8, height: 8, borderRadius: '50%', display: 'block',
          backgroundColor: hovered ? '#ffffff' : '#09090b',
          transition: 'background-color 0.25s ease',
        }}
      />
      {/* Label */}
      <span style={{ position: 'relative', zIndex: 1, color: hovered ? '#ffffff' : '#09090b', transition: 'color 0.25s ease' }}>
        {children}
      </span>
    </button>
  )
}
