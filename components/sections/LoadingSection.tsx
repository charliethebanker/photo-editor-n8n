'use client'

import { motion } from 'framer-motion'

interface LoadingSectionProps {
  message?: string
}

export default function LoadingSection({ message = 'Processando sua fotografia...' }: LoadingSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center gap-8"
    >
      {/* Multi-ring Spinner */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary-light"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute inset-3 rounded-full border-4 border-transparent border-t-accent border-r-accent-orange"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-transparent border-t-primary-light border-r-success"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Center aperture icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
            {/* Aperture blades */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.path
                key={i}
                d="M12 12 L12 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-primary"
                style={{
                  transformOrigin: '12px 12px',
                  transform: `rotate(${i * 45}deg)`,
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
            <circle cx="12" cy="12" r="2" fill="currentColor" className="text-primary" />
          </svg>
        </motion.div>
      </div>

      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          {message}
        </h2>
        <motion.p
          className="text-gray-400 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Aguarde enquanto aplicamos melhorias profissionais à sua imagem
        </motion.p>
      </motion.div>

      {/* Processing Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-xl p-6 max-w-md"
      >
        <div className="space-y-3">
          {[
            { step: 'Análise de qualidade', delay: 0 },
            { step: 'Ajuste de cores e exposição', delay: 0.3 },
            { step: 'Otimização para redes sociais', delay: 0.6 },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + item.delay }}
              className="flex items-center gap-3 text-gray-300 text-sm"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                }}
              />
              {item.step}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
