import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Provider from '@/context/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roofah Housing - Authentication',
  description: 'Create an account or log in to Roofah Housing to find your next stay.',
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
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  )
}
