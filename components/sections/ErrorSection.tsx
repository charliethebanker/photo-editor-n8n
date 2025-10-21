'use client'

import { motion } from 'framer-motion'
import GlassButton from '../ui/GlassButton'
import RetryIcon from '../icons/RetryIcon'
import CameraIcon from '../icons/CameraIcon'

interface ErrorSectionProps {
  message?: string
  onRetry: () => void
  onNewPhoto: () => void
}

export default function ErrorSection({
  message = 'Ocorreu um erro ao processar a imagem',
  onRetry,
  onNewPhoto,
}: ErrorSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center gap-8"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-error to-accent-orange flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </svg>
        </div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-error"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* Error Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-2xl p-8 max-w-2xl w-full text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Ops! Algo deu errado</h2>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400">
            Possíveis causas:
          </p>
          <ul className="text-sm text-gray-300 mt-2 space-y-1 text-left list-disc list-inside">
            <li>Falha na conexão com o servidor</li>
            <li>Formato de imagem não suportado</li>
            <li>Arquivo muito grande (limite: 10MB)</li>
            <li>Timeout durante o processamento</li>
          </ul>
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
            variant="primary"
            onClick={onRetry}
            icon={<RetryIcon className="w-6 h-6" />}
          >
            Tentar Novamente
          </GlassButton>
        </div>
      </motion.div>

      {/* Help Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 text-sm text-center max-w-md"
      >
        Se o problema persistir, tente usar uma imagem menor ou em formato diferente
        (JPG, PNG recomendados).
      </motion.p>
    </motion.div>
  )
}
