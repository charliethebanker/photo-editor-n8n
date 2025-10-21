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
      console.log('📤 Enviando para webhook:', selectedFile.name)
      console.log('📁 Tamanho:', (selectedFile.size / 1024).toFixed(2), 'KB')

      // Create FormData for webhook
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('filename', selectedFile.name)
      formData.append('mimeType', selectedFile.type)

      // Get original image URL for comparison
      const originalUrl = URL.createObjectURL(selectedFile)

      // Webhook URL from environment or default
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://olancador.pt/webhook/fotografo'

      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 120 seconds

      // Call n8n webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log('📡 Status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Erro do servidor:', errorText)
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      // Handle different response types
      const contentType = response.headers.get('content-type')
      console.log('📄 Content-Type:', contentType)

      let result: any
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        console.log('📝 Resposta (texto):', text.substring(0, 200))
        result = { editedImage: text }
      }

      console.log('✅ Resposta do webhook recebida')

      // Check for valid response
      if (!result.editedImage && !result.image) {
        throw new Error('Resposta inválida do servidor. Imagem processada não encontrada.')
      }

      // Set image data for result view
      const processedImageUrl = result.editedImage || result.image

      setImageData({
        original: originalUrl,
        processed: processedImageUrl,
      })

      setCurrentView('result')
    } catch (error) {
      console.error('❌ Erro no processamento:', error)

      let errorMsg = 'Falha ao processar a imagem. Tente novamente.'

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMsg = 'Tempo limite excedido. A imagem pode ser muito grande ou o servidor está lento.'
        } else if (error.message.includes('Failed to fetch')) {
          errorMsg = 'Erro de conexão. Verifique:\n• Webhook está ativo?\n• CORS configurado?\n• Internet funcional?'
        } else {
          errorMsg = error.message
        }
      }

      setErrorMessage(errorMsg)
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
