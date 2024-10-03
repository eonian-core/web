import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'

import './globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import clsx from 'clsx'
import Script from 'next/script'
import Providers from './providers/providers'
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'
import PageLoaderTop from './components/page-loading-top/page-loader-top'
import SlidingFooter from './components/sliding-footer/sliding-footer'
import GoogleAnalytics from './google-analytics'
import { store } from './store/store'
import { setLocale } from './store/slices/localeSlice'
import { ToastContainerWrapperDynamic } from './components'
import { robotoFont } from './shared/fonts/Roboto'
import { addHttpIfNeed, logEnv } from './api/environment'

export interface RootLayoutProps {
  children: React.ReactNode
}

const locale = 'en'

export default function RootLayout({ children }: RootLayoutProps) {
  store.dispatch(setLocale(locale))

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <Analytics />
      </head>
      <GoogleAnalytics />
      <body className={clsx(robotoFont.className, 'dark text-foreground bg-background')}>
        <Providers locale={locale}>
          <PageLoaderTop />
          <Navigation />
          <ToastContainerWrapperDynamic />
          <SlidingFooter footer={<Footer />}>{children}</SlidingFooter>
        </Providers>
      </body>
    </html>
  )
}

function Analytics() {
  if (process.env.VERCEL_ENV !== 'production')
    return null

  return (
    <Script type="text/javascript" id="analytics-ms">{`
(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nsntzbdma2");
    `}</Script>
  )
}

const VERCEL_BRANCH_URL = logEnv('VERCEL_BRANCH_URL', process.env.VERCEL_BRANCH_URL)
const VERCEL_URL = logEnv('VERCEL_URL', process.env.VERCEL_URL)
const VERCEL_PROJECT_PRODUCTION_URL = logEnv('VERCEL_PROJECT_PRODUCTION_URL', process.env.VERCEL_PROJECT_PRODUCTION_URL)
const NEXT_PUBLIC_APP_URL = logEnv('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL)

// Based on https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
const metadataBase: string = addHttpIfNeed(VERCEL_BRANCH_URL || VERCEL_URL || VERCEL_PROJECT_PRODUCTION_URL || NEXT_PUBLIC_APP_URL || 'https://eonian.finance/')
// eslint-disable-next-line no-console
console.log('Metadata Base', metadataBase)

export const metadata: Metadata = {
  metadataBase: new URL(metadataBase),
  title: {
    template: '%s | Eonian',
    default: 'Eonian DAO',
  },
  description: 'The first insured decentralized savings account protocol that allows you to earn crypto passively',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: metadataBase,
    title: {
      template: '%s | Eonian',
      default: 'Eonian DAO | The first decentralized savings account',
    },
    description: 'The first insured decentralized savings account that allows you to earn crypto passively',
    siteName: 'Eonian DAO',
  },
  twitter: {
    creator: '@EonianFinance',
    site: '@EonianFinance',
    card: 'summary_large_image',
  },
  themeColor: '#181b1b',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/site.webmanifest',
}
