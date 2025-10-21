'use client'

export default function FrameIcon({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg className={`${className} drop-shadow-lg`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="imageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a5b4fc', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.5 }} />
        </linearGradient>
        <linearGradient id="plusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Main frame */}
      <g className="origin-center transition-transform hover:translate-y-[-3px]">
        <rect x="15" y="15" width="70" height="70" rx="4" fill="url(#frameGrad)" opacity="0.2"/>
        <rect x="15" y="15" width="70" height="70" rx="4" fill="none" stroke="url(#frameGrad)" strokeWidth="2.5"/>

        {/* Image area */}
        <rect x="20" y="20" width="60" height="50" rx="2" fill="url(#imageGrad)"/>

        {/* Mountain icon */}
        <path d="M 30 60 L 45 45 L 55 55 L 70 40 L 75 45 L 75 65 L 25 65 Z" fill="url(#frameGrad)" opacity="0.5"/>

        {/* Sun */}
        <circle cx="68" cy="28" r="5" fill="url(#plusGrad)" opacity="0.6"/>

        {/* Focus corners */}
        <path d="M 18 18 L 25 18 M 18 18 L 18 25" stroke="url(#plusGrad)" strokeWidth="2" opacity="0.8"/>
        <path d="M 82 18 L 75 18 M 82 18 L 82 25" stroke="url(#plusGrad)" strokeWidth="2" opacity="0.8"/>
        <path d="M 18 82 L 25 82 M 18 82 L 18 75" stroke="url(#plusGrad)" strokeWidth="2" opacity="0.8"/>
        <path d="M 82 82 L 75 82 M 82 82 L 82 75" stroke="url(#plusGrad)" strokeWidth="2" opacity="0.8"/>
      </g>

      {/* Upload indicator */}
      <g className="origin-[75%_75%] transition-transform hover:scale-110 animate-pulse">
        <circle cx="75" cy="75" r="15" fill="url(#plusGrad)" opacity="0.9"/>
        <circle cx="75" cy="75" r="15" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5"/>
        <line x1="75" y1="68" x2="75" y2="82" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="75" x2="82" y2="75" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* Sparkles */}
      <circle cx="12" cy="30" r="2" fill="#FCD34D" opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="88" cy="50" r="2.5" fill="#A5B4FC" opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <circle cx="30" cy="10" r="1.5" fill="#10B981" opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" begin="0.3s"/>
      </circle>
      <circle cx="90" cy="20" r="1.8" fill="#818cf8" opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" begin="0.7s"/>
      </circle>
    </svg>
  )
}
