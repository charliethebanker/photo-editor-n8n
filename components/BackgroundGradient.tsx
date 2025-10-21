'use client'

export default function BackgroundGradient() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.9 }}>
              <animate attributeName="stop-color" values="#6366f1;#818cf8;#6366f1" dur="10s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.7 }}>
              <animate attributeName="stop-color" values="#f59e0b;#fbbf24;#f59e0b" dur="12s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }}>
              <animate attributeName="stop-color" values="#ef4444;#f87171;#ef4444" dur="14s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" style={{ stopColor: '#818cf8', stopOpacity: 0.7 }}>
              <animate attributeName="stop-color" values="#818cf8;#a5b4fc;#818cf8" dur="11s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }}>
              <animate attributeName="stop-color" values="#10b981;#34d399;#10b981" dur="13s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          <radialGradient id="rev_grad3">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }}>
              <animate attributeName="stop-color" values="#8b5cf6;#a78bfa;#8b5cf6" dur="15s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.5 }}>
              <animate attributeName="stop-color" values="#ec4899;#f472b6;#ec4899" dur="16s" repeatCount="indefinite"/>
            </stop>
          </radialGradient>
          <radialGradient id="rev_grad4">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.7 }}>
              <animate attributeName="stop-color" values="#06b6d4;#22d3ee;#06b6d4" dur="18s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }}>
              <animate attributeName="stop-color" values="#3b82f6;#60a5fa;#3b82f6" dur="17s" repeatCount="indefinite"/>
            </stop>
          </radialGradient>
          <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="40"/>
          </filter>
          <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="30"/>
          </filter>
          <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="50"/>
          </filter>
        </defs>

        {/* Layer 1 */}
        <g className="animate-float">
          <ellipse cx="200" cy="500" rx="280" ry="200" fill="url(#rev_grad1)" filter="url(#blur1)" transform="rotate(-30 200 500)">
            <animateTransform attributeName="transform" type="rotate" values="-30 200 500;-20 200 500;-30 200 500" dur="20s" repeatCount="indefinite"/>
          </ellipse>
          <rect x="500" y="100" width="320" height="280" rx="90" fill="url(#rev_grad2)" filter="url(#blur2)" transform="rotate(15 650 225)">
            <animateTransform attributeName="transform" type="rotate" values="15 650 225;25 650 225;15 650 225" dur="22s" repeatCount="indefinite"/>
          </rect>
        </g>

        {/* Layer 2 */}
        <g className="animate-float-slow">
          <circle cx="650" cy="450" r="170" fill="url(#rev_grad3)" filter="url(#blur3)" opacity="0.7">
            <animate attributeName="r" values="170;190;170" dur="18s" repeatCount="indefinite"/>
          </circle>
          <ellipse cx="50" cy="150" rx="200" ry="140" fill="url(#rev_grad4)" filter="url(#blur2)" opacity="0.8">
            <animate attributeName="rx" values="200;220;200" dur="16s" repeatCount="indefinite"/>
            <animate attributeName="ry" values="140;160;140" dur="17s" repeatCount="indefinite"/>
          </ellipse>
        </g>

        {/* Layer 3 */}
        <g>
          <circle cx="400" cy="300" r="120" fill="url(#rev_grad1)" filter="url(#blur2)" opacity="0.6">
            <animate attributeName="cx" values="400;420;400" dur="24s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="300;280;300" dur="26s" repeatCount="indefinite"/>
          </circle>
          <ellipse cx="700" cy="100" rx="150" ry="100" fill="url(#rev_grad3)" filter="url(#blur3)" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0 700 100;360 700 100" dur="40s" repeatCount="indefinite"/>
          </ellipse>
        </g>
      </svg>
    </div>
  )
}
