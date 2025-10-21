interface GalleryIconProps {
  className?: string
}

export default function GalleryIcon({ className = 'w-6 h-6' }: GalleryIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Back photo frame */}
        <rect x="7" y="3" width="14" height="14" rx="2" opacity="0.4" />

        {/* Middle photo frame */}
        <rect x="5" y="5" width="14" height="14" rx="2" opacity="0.6" />

        {/* Front photo frame */}
        <rect x="3" y="7" width="14" height="14" rx="2" />

        {/* Simple landscape image inside front frame */}
        <g opacity="0.8">
          {/* Mountain peaks */}
          <path d="M5 17 L8 13 L11 16 L14 12 L15 13" strokeWidth="1.5" />
          {/* Sun */}
          <circle cx="13" cy="11" r="1.5" fill="currentColor" />
        </g>
      </g>
    </svg>
  )
}
