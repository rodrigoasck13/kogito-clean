
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kogito - Think. Reflect. Create Your AI.',
  description: 'Build a personal assistant that thinks like you do. Kogito helps you create AI that reflects your personality, communication style, and decision-making process.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white`}>
        <SessionProvider>
          {children}
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  )
}
