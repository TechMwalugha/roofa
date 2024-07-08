import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import TopBar from '@/components/shared/TopBar'
import BottomBar from '@/components/shared/BottomBar'
import Provider from '@/context/Provider'
import type { Viewport } from "next";

const APP_NAME = "Roofa Housing PLC";
const APP_DEFAULT_TITLE = "Roofah Housing - Book airbnb or rentals in Kenya";
const APP_TITLE_TEMPLATE = "%s - Roofah";
const APP_DESCRIPTION = "Explore top-quality rentals and Airbnbs in Nairobi and Nakuru with Roofah Housing. Discover comfortable accommodations for short-term stays and long-term leases.";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#67C1CA",
};

const inter = Inter({ subsets: ['latin'] })


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
          <TopBar />   
          {children}
          <BottomBar />
        </Provider>
      </body>
    </html>
  )
}
