import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Provider from '@/context/Provider'
import AsideBar from '@/components/admin/shared/AsideBar'
import TopBar from '@/components/admin/shared/TopBar'

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
        <TopBar/>
        <div className='p-4 md:pl-80 mt-20'>
          {children}
        </div>
        <AsideBar/>
      </Provider>
      </body>
    </html>
  )
}
