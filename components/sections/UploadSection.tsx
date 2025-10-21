'use client'

import { useState, useCallback, DragEvent } from 'react'
import { motion } from 'framer-motion'
import FrameIcon from '../icons/FrameIcon'
import GlassButton from '../ui/GlassButton'

interface UploadSectionProps {
  onFileSelect: (file: File) => void
}

export default function UploadSection({ onFileSelect }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center flex-1 px-4"
    >
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.05 : 1,
          borderColor: isDragging ? 'rgba(129, 140, 248, 0.8)' : 'rgba(255, 255, 255, 0.15)'
        }}
        className={`
          w-full max-w-2xl min-h-[400px]
          glass-effect
          rounded-3xl
          border-3 border-dashed
          flex flex-col items-center justify-center
          cursor-pointer
          transition-all duration-400
          p-12 text-center
          hover:border-primary hover:bg-white/5
          ${isDragging ? 'bg-primary/10' : ''}
        `}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="mb-6 transform hover:scale-105 transition-transform">
          <FrameIcon className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-white">
          Arraste a sua foto aqui
        </h2>

        <p className="text-gray-400 mb-8">
          ou clique para selecionar um ficheiro
        </p>

        <GlassButton
          variant="primary"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
            <circle cx="15" cy="8" r="1.5" fill="currentColor"/>
            <path d="M 6 20 L 10 15 L 13 18 L 18 12 L 18 20 Z" opacity="0.6"/>
          </svg>
          Escolher Ficheiro
        </GlassButton>

        <p className="mt-6 text-xs text-gray-500">
          Máximo 10MB • JPG, PNG ou WEBP
        </p>

        <input
          id="file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />
      </motion.div>
    </motion.section>
  )
}
