'use client'

import { ReactNode, MouseEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  icon?: ReactNode
}

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  icon
}: GlassButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      id: Date.now()
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createRipple(e)
      onClick?.()
    }
  }

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-primary/85 via-primary-light/95 to-accent/80
      hover:from-primary/90 hover:via-primary-light hover:to-accent/85
      shadow-[inset_0_0.125em_0.125em_rgba(255,255,255,0.05),0_0.25em_0.125em_-0.125em_rgba(99,102,241,0.3),0_0_20px_rgba(99,102,241,0.2)]
      hover:shadow-[inset_0_0.125em_0.125em_rgba(255,255,255,0.08),0_0.35em_0.15em_-0.1em_rgba(99,102,241,0.4),0_0_30px_rgba(99,102,241,0.3)]
    `,
    secondary: `
      bg-gradient-to-br from-gray-800/60 via-gray-700/80 to-gray-800/55
      hover:from-gray-800/70 hover:via-gray-700/90 hover:to-gray-800/65
      border border-white/10 hover:border-white/15
      hover:shadow-[0_0.25em_0.15em_-0.1em_rgba(255,255,255,0.2),0_0_15px_rgba(255,255,255,0.1)]
    `,
    success: `
      bg-gradient-to-br from-accent/80 via-accent/95 to-accent/75
      shadow-[0_0.25em_0.125em_-0.125em_rgba(16,185,129,0.25),0_0_15px_rgba(16,185,129,0.15)]
    `
  }

  return (
    <div className="relative inline-block">
      <motion.button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        whileHover={{ scale: 0.975 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden
          px-8 py-3.5 rounded-full
          font-semibold text-white
          backdrop-blur-sm
          transition-all duration-400
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${variantStyles[variant]}
          ${className}
        `}
      >
        {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
        <span className="relative z-10">{children}</span>

        {/* Ripple effects */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '100px',
              height: '100px',
              animationDuration: '600ms'
            }}
          />
        ))}
      </motion.button>

      {/* Shadow */}
      <div className="absolute inset-0 rounded-full blur-sm opacity-30 -z-10"
           style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}
      />
    </div>
  )
}
