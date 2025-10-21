'use client'

import { motion } from 'framer-motion'
import ApertureIcon from '../icons/ApertureIcon'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center mb-12 pt-8 pb-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex items-center justify-center gap-4 mb-4"
      >
        <ApertureIcon className="w-16 h-16" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="text-5xl font-bold mb-2 relative inline-block"
      >
        <span className="text-gradient bg-[length:200%_200%] animate-shimmer">
          O fotografo
        </span>
        <span className="absolute inset-0 text-gradient bg-[length:200%_100%] opacity-30 animate-shimmer" />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        className="text-lg text-gray-400 font-medium tracking-wide flex items-center justify-center gap-2"
      >
        <span className="animate-pulse">✨</span>
        Editor de fotografias automático
        <span className="animate-pulse" style={{ animationDelay: '1s' }}>✨</span>
      </motion.p>
    </motion.header>
  )
}
