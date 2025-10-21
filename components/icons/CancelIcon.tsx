interface CancelIconProps {
  className?: string
}

export default function CancelIcon({ className = 'w-6 h-6' }: CancelIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* X mark with camera shutter style */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {/* Outer frame corners */}
        <path d="M4 4 L7 4 M4 4 L4 7" opacity="0.6" />
        <path d="M20 4 L17 4 M20 4 L20 7" opacity="0.6" />
        <path d="M4 20 L7 20 M4 20 L4 17" opacity="0.6" />
        <path d="M20 20 L17 20 M20 20 L20 17" opacity="0.6" />

        {/* X mark */}
        <path d="M8 8 L16 16" strokeWidth="2.5" />
        <path d="M16 8 L8 16" strokeWidth="2.5" />
      </g>
    </svg>
  )
}
