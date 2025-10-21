interface DownloadIconProps {
  className?: string
}

export default function DownloadIcon({ className = 'w-6 h-6' }: DownloadIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera/photo frame */}
        <rect x="3" y="9" width="18" height="12" rx="2" opacity="0.7" />

        {/* Download arrow */}
        <path d="M12 4 L12 14 M12 14 L9 11 M12 14 L15 11" strokeWidth="2.5" />

        {/* Bottom tray/storage */}
        <path d="M7 21 L17 21" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
