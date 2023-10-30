import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
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
      <body className={inter.className}> 
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  )
}
