interface RetryIconProps {
  className?: string
}

export default function RetryIcon({ className = 'w-6 h-6' }: RetryIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Circular arrow (retry/refresh) */}
        <path
          d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C14.76 3 17.19 4.24 18.84 6.24"
          strokeWidth="2.5"
        />

        {/* Arrow head */}
        <path d="M18.84 6.24 L18.84 2 M18.84 6.24 L14.6 6.24" strokeWidth="2.5" />

        {/* Camera shutter blades in center (photography theme) */}
        <g opacity="0.6" strokeWidth="1.5">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 12 + Math.cos(rad) * 2
            const y1 = 12 + Math.sin(rad) * 2
            const x2 = 12 + Math.cos(rad) * 4
            const y2 = 12 + Math.sin(rad) * 4
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </g>
      </g>
    </svg>
  )
}
