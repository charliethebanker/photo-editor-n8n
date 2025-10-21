'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BackgroundGradient from '@/components/BackgroundGradient'
import Header from '@/components/sections/Header'
import UploadSection from '@/components/sections/UploadSection'
import PreviewSection from '@/components/sections/PreviewSection'
import LoadingSection from '@/components/sections/LoadingSection'
import ResultSection from '@/components/sections/ResultSection'
import ErrorSection from '@/components/sections/ErrorSection'

type ViewState = 'upload' | 'preview' | 'loading' | 'result' | 'error'

interface ProcessedImageData {
  original: string
  processed: string
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageData, setImageData] = useState<ProcessedImageData | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name)
    setSelectedFile(file)
    setCurrentView('preview')
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setCurrentView('upload')
  }

  const handleSendToProcess = async () => {
    if (!selectedFile) return

    setCurrentView('loading')

    try {
      // Create FormData for webhook
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Get original image URL for comparison
      const originalUrl = URL.createObjectURL(selectedFile)

      // TODO: Replace with actual webhook URL from environment variable
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '/api/process'

      // Call n8n webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status}`)
      }

      const result = await response.json()

      // Set image data for result view
      setImageData({
        original: originalUrl,
        processed: result.processedImageUrl || originalUrl, // Fallback to original if no processed image
      })

      setCurrentView('result')
    } catch (error) {
      console.error('Error processing image:', error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Falha ao processar a imagem. Tente novamente.'
      )
      setCurrentView('error')
    }
  }

  const handleRetry = () => {
    if (selectedFile) {
      setCurrentView('preview')
    } else {
      setCurrentView('upload')
    }
  }

  const handleNewPhoto = () => {
    // Clean up
    if (imageData?.original) {
      URL.revokeObjectURL(imageData.original)
    }
    setSelectedFile(null)
    setImageData(null)
    setErrorMessage('')
    setCurrentView('upload')
  }

  const handleDownload = (format?: string) => {
    if (!imageData?.processed) return

    // Download the processed image
    fetch(imageData.processed)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `fotografo-${format || 'original'}-${Date.now()}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      .catch((error) => {
        console.error('Download error:', error)
      })
  }

  return (
    <main className="relative min-h-screen">
      <BackgroundGradient />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <AnimatePresence mode="wait">
          {currentView === 'upload' && (
            <UploadSection key="upload" onFileSelect={handleFileSelect} />
          )}

          {currentView === 'preview' && selectedFile && (
            <PreviewSection
              key="preview"
              file={selectedFile}
              onCancel={handleCancel}
              onSend={handleSendToProcess}
            />
          )}

          {currentView === 'loading' && (
            <LoadingSection key="loading" />
          )}

          {currentView === 'result' && imageData && (
            <ResultSection
              key="result"
              originalImage={imageData.original}
              processedImage={imageData.processed}
              onNewPhoto={handleNewPhoto}
              onDownload={handleDownload}
            />
          )}

          {currentView === 'error' && (
            <ErrorSection
              key="error"
              message={errorMessage}
              onRetry={handleRetry}
              onNewPhoto={handleNewPhoto}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
