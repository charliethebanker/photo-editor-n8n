import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'O fotografo - Editor de Fotografias',
  description: 'Editor de fotografias automático via webhook n8n',
  authors: [{ name: 'charliethebanker' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen relative">
        {children}
      </body>
    </html>
  )
}
