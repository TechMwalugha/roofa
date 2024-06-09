import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import TopBar from '@/components/shared/TopBar'
import BottomBar from '@/components/shared/BottomBar'
import Provider from '@/context/Provider'


const inter = Inter({ subsets: ['latin'] })
 const metadata: Metadata = {
  title: 'Roofa Housing',
  description: 'Find your next stay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6RCQT81ZG6"></script>
      <script src='/lib/google-analytics.js'></script>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
