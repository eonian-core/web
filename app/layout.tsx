import type { Metadata } from 'next'

import './globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import clsx from 'clsx'
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

export interface RootLayoutProps {
  children: React.ReactNode
}

const locale = 'en'

export default function RootLayout({ children }: RootLayoutProps) {
  store.dispatch(setLocale(locale))

  return (
    <html lang={locale} suppressHydrationWarning>
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

export const metadata: Metadata = {
  title: {
    template: '%s | Eonian Protocol',
    default: 'Eonian Protocol',
  },
  description: 'Decentralized and secure protocol for passive investments with peace of mind.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://eonian.finance/',
    title: {
      template: '%s | Eonian Protocol',
      default: 'Eonian | Crypto yield aggregator that cares about security',
    },
    description: 'Decentralized and secure real yeild protocol for passive investments with peace of mind.',
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
