'use client'

export default function ApertureIcon({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg className={`${className} drop-shadow-lg animate-glow`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="apertureGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#a5b4fc', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="apertureGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
        </linearGradient>
        <radialGradient id="apertureCenterGlow">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#a5b4fc', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.1 }} />
        </radialGradient>
      </defs>

      {/* Outer rings */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#apertureGrad1)" strokeWidth="2.5" opacity="0.6"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#apertureGrad1)" strokeWidth="1.5" opacity="0.8"/>

      {/* Aperture blades */}
      <g className="origin-center animate-pulse">
        <path d="M 50 15 L 65 35 L 50 35 Z" fill="url(#apertureGrad1)" opacity="0.9"/>
        <path d="M 65 35 L 75 50 L 65 50 Z" fill="url(#apertureGrad1)" opacity="0.85"/>
        <path d="M 75 50 L 65 65 L 65 50 Z" fill="url(#apertureGrad1)" opacity="0.9"/>
        <path d="M 65 65 L 50 85 L 50 65 Z" fill="url(#apertureGrad1)" opacity="0.85"/>
        <path d="M 50 85 L 35 65 L 50 65 Z" fill="url(#apertureGrad1)" opacity="0.9"/>
        <path d="M 35 65 L 25 50 L 35 50 Z" fill="url(#apertureGrad1)" opacity="0.85"/>
        <path d="M 25 50 L 35 35 L 35 50 Z" fill="url(#apertureGrad1)" opacity="0.9"/>
        <path d="M 35 35 L 50 15 L 50 35 Z" fill="url(#apertureGrad1)" opacity="0.85"/>
      </g>

      {/* Center */}
      <circle cx="50" cy="50" r="18" fill="url(#apertureCenterGlow)"/>
      <circle cx="50" cy="50" r="15" fill="none" stroke="url(#apertureGrad2)" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="url(#apertureGrad2)" opacity="0.6"/>
      <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.9">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
      </circle>

      {/* Corner marks */}
      <path d="M 10 10 L 15 10 L 15 15" stroke="url(#apertureGrad2)" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M 90 10 L 85 10 L 85 15" stroke="url(#apertureGrad2)" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M 10 90 L 15 90 L 15 85" stroke="url(#apertureGrad2)" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M 90 90 L 85 90 L 85 85" stroke="url(#apertureGrad2)" strokeWidth="2" fill="none" opacity="0.5"/>
    </svg>
  )
}
