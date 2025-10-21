interface SendIconProps {
  className?: string
}

export default function SendIcon({ className = 'w-6 h-6' }: SendIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Camera with arrow (send to process) */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera body */}
        <rect x="2" y="8" width="20" height="13" rx="2" opacity="0.8" />

        {/* Lens circle */}
        <circle cx="12" cy="14.5" r="3.5" opacity="0.9" />

        {/* Viewfinder on top */}
        <path d="M7 8 L7 6 L10 6 L10 8" opacity="0.6" />

        {/* Arrow (send/upload) */}
        <g transform="translate(16, 4)">
          <path d="M0 4 L0 -2 M0 -2 L-2 0 M0 -2 L2 0" strokeWidth="1.8" />
        </g>
      </g>
    </svg>
  )
}
