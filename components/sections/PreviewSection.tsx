'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlassButton from '../ui/GlassButton'
import CancelIcon from '../icons/CancelIcon'
import SendIcon from '../icons/SendIcon'

interface PreviewSectionProps {
  file: File
  onCancel: () => void
  onSend: () => void
}

export default function PreviewSection({ file, onCancel, onSend }: PreviewSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>('')

  // Create preview URL when component mounts
  useEffect(() => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center gap-8"
    >
      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-8 max-w-4xl w-full"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Pré-visualização da Imagem
        </h2>

        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden bg-black/20 mb-6">
          <motion.img
            src={imageUrl}
            alt="Preview"
            className="w-full h-auto max-h-[500px] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        {/* File Info */}
        <div className="text-center text-gray-400 text-sm mb-6">
          <p className="font-medium">{file.name}</p>
          <p className="text-xs mt-1">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <GlassButton
            variant="secondary"
            onClick={onCancel}
            icon={<CancelIcon className="w-6 h-6" />}
          >
            Cancelar
          </GlassButton>

          <GlassButton
            variant="primary"
            onClick={onSend}
            icon={<SendIcon className="w-6 h-6" />}
          >
            Processar Imagem
          </GlassButton>
        </motion.div>
      </motion.div>

      {/* Info Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-400 text-sm text-center max-w-md"
      >
        Clique em <span className="text-primary font-semibold">Processar Imagem</span> para
        iniciar o processamento automático da sua fotografia.
      </motion.p>
    </motion.div>
  )
}
