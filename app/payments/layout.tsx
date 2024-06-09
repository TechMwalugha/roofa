import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Provider from '@/context/Provider'
import Link from 'next/link'
import Image from 'next/image'
import DropMenu from '@/components/cards/DropMenu'
import BottomBar from '@/components/shared/BottomBar'

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
      <Provider> 
        <header className='flex sticky top-0 bg-white z-10 items-center justify-between px-2 mb-2 shadow'>
        <Link href="/" className="">
            <Image 
            src='/assets/roofalogo.png'
            width={70}
            height={70}
            alt="Roofa logo"
            className="object-cover"
            />
        </Link>

        <DropMenu/>
        </header> 
      
        {children}

        <BottomBar/>
      </Provider>
      </body>
    </html>
  )
}
