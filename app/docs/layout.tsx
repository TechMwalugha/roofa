import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import TopBar from '@/components/shared/TopBar'
import BottomBar from '@/components/shared/BottomBar'
import Provider from '@/context/Provider'


const inter = Inter({ subsets: ['latin'] })

 export const metadata: Metadata = {
  title: 'Roofah Housing PLC - Legal Terms',
  description: 'Learn about how Roofah Housing protects your privacy and handles your personal information.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6RCQT81ZG6"></script>
        <script src='/google-analytics.js'></script>
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
