'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GlassButton from '../ui/GlassButton'
import DownloadIcon from '../icons/DownloadIcon'
import CameraIcon from '../icons/CameraIcon'
import GalleryIcon from '../icons/GalleryIcon'

interface ResultSectionProps {
  originalImage: string
  processedImage: string
  onNewPhoto: () => void
  onDownload?: (format?: string) => void
}

type SocialFormat = 'original' | 'instagram-post' | 'instagram-story' | 'tiktok' | 'twitter'

interface FormatOption {
  id: SocialFormat
  label: string
  dimensions: string
  icon: string
}

const formatOptions: FormatOption[] = [
  { id: 'original', label: 'Original', dimensions: 'Tamanho original', icon: '📷' },
  { id: 'instagram-post', label: 'Instagram Post', dimensions: '1080x1080', icon: '📱' },
  { id: 'instagram-story', label: 'Instagram Story', dimensions: '1080x1920', icon: '📲' },
  { id: 'tiktok', label: 'TikTok', dimensions: '1080x1920', icon: '🎵' },
  { id: 'twitter', label: 'Twitter', dimensions: '1200x675', icon: '🐦' },
]

export default function ResultSection({
  originalImage,
  processedImage,
  onNewPhoto,
  onDownload,
}: ResultSectionProps) {
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('original')
  const [showComparison, setShowComparison] = useState(true)
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleDownload = () => {
    if (onDownload) {
      onDownload(selectedFormat)
    } else {
      // Default download behavior
      const link = document.createElement('a')
      link.href = processedImage
      link.download = `processed-${selectedFormat}.jpg`
      link.click()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 py-8"
    >
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Imagem Processada!</h2>
        <p className="text-gray-400">Sua fotografia foi otimizada com sucesso</p>
      </motion.div>

      {/* Image Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-2xl p-6 max-w-5xl w-full"
      >
        {/* Comparison Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowComparison(true)}
            className={`px-4 py-2 rounded-lg transition-all ${
              showComparison
                ? 'bg-primary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <GalleryIcon className="w-5 h-5 inline mr-2" />
            Comparar
          </button>
          <button
            onClick={() => setShowComparison(false)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !showComparison
                ? 'bg-primary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Resultado Final
          </button>
        </div>

        {/* Image Display */}
        <div className="relative rounded-xl overflow-hidden bg-black/20 mb-6">
          {showComparison ? (
            // Before/After Slider
            <div className="relative w-full aspect-video">
              {/* After image (full) */}
              <img
                src={processedImage}
                alt="Processed"
                className="absolute inset-0 w-full h-full object-contain"
              />

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Slider Control */}
              <div className="absolute inset-0">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 rounded-lg text-white text-sm font-medium">
                Antes
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 rounded-lg text-white text-sm font-medium">
                Depois
              </div>
            </div>
          ) : (
            // Final result only
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={processedImage}
              alt="Processed Result"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          )}
        </div>

        {/* Social Media Format Selector */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-4 text-center">
            Escolha o formato para download:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {formatOptions.map((format) => (
              <motion.button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedFormat === format.id
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{format.icon}</div>
                <div className="text-white font-medium text-sm mb-1">{format.label}</div>
                <div className="text-gray-400 text-xs">{format.dimensions}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <GlassButton
            variant="secondary"
            onClick={onNewPhoto}
            icon={<CameraIcon className="w-6 h-6" />}
          >
            Nova Foto
          </GlassButton>

          <GlassButton
            variant="success"
            onClick={handleDownload}
            icon={<DownloadIcon className="w-6 h-6" />}
          >
            Download {selectedFormat !== 'original' && `(${formatOptions.find(f => f.id === selectedFormat)?.label})`}
          </GlassButton>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 text-sm text-center max-w-2xl"
      >
        Use o controle deslizante para comparar as imagens antes e depois.
        Selecione o formato ideal para sua rede social preferida.
      </motion.p>
    </motion.div>
  )
}
