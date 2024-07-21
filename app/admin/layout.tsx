import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Provider from '@/context/Provider'
import AsideBar from '@/components/admin/shared/AsideBar'
import TopBar from '@/components/admin/shared/TopBar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { fetchUserByEmail } from '@/lib/actions/user.actions'

const inter = Inter({ subsets: ['latin'] })

 export const metadata: Metadata = {
  title: 'Roofa Housing - Administration',
  description: 'Create, Read, Update the information on Roofah Housing PLC',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()
  if(!session) {
    redirect('/not-found')
  }
  const sessionUser = await fetchUserByEmail(session?.user?.email as string)

  if(!sessionUser) {
    redirect('/not-found')
  }

  let isAllowed: boolean =  (sessionUser.role === 'roofa-agent' || sessionUser.role === 'admin') ? true : false

  if(!isAllowed) {
    redirect('/not-found')
  }

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6RCQT81ZG6"></script>
        <script src='/google-analytics.js'></script>
      </head>
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
