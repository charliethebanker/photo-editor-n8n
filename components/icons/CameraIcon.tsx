interface CameraIconProps {
  className?: string
}

export default function CameraIcon({ className = 'w-6 h-6' }: CameraIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera body */}
        <rect x="2" y="7" width="20" height="14" rx="2" />

        {/* Lens */}
        <circle cx="12" cy="14" r="4" />
        <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.5" />

        {/* Top viewfinder */}
        <path d="M7 7 L7 5 C7 4.4 7.4 4 8 4 L10 4 C10.6 4 11 4.4 11 5 L11 7" />

        {/* Flash indicator */}
        <circle cx="18" cy="10" r="0.8" fill="currentColor" />

        {/* Focus marks in corners of lens */}
        <g opacity="0.6" strokeWidth="1.5">
          <path d="M8.5 11 L9 11 M8.5 11 L8.5 11.5" />
          <path d="M15.5 11 L15 11 M15.5 11 L15.5 11.5" />
          <path d="M8.5 17 L9 17 M8.5 17 L8.5 16.5" />
          <path d="M15.5 17 L15 17 M15.5 17 L15.5 16.5" />
        </g>
      </g>
    </svg>
  )
}
