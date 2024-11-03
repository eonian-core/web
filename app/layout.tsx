import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'

import './globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import clsx from 'clsx'

import type { PropsWithChildren } from 'react'
import Providers from './providers/providers'
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'
import PageLoaderTop from './components/page-loading-top/page-loader-top'
import SlidingFooter from './components/sliding-footer/sliding-footer'
import { store } from './store/store'
import { setLocale } from './store/slices/localeSlice'
import { ToastContainerWrapperDynamic } from './components'
import { robotoFont } from './shared/fonts/Roboto'
import { AfterHeadAnalytics, AroundBodyProviderAnalytics, InBodyProviderAnalytics, InHeadAnalytics } from './analytics/analytics-provider'
import { bootstrapExeperiments } from './experiments/bootstrap'
import { addHttpIfNeed } from '@/utils/addHttpIfNeeded'
import { isProduction, logEnv } from '@/utils/env'

const locale = 'en'

export default async function RootLayout({ children }: PropsWithChildren) {
  store.dispatch(setLocale(locale))

  const experiments = await bootstrapExeperiments()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <InHeadAnalytics />
      </head>
      <AfterHeadAnalytics />

      <AroundBodyProviderAnalytics bootstrap={experiments}>
        <body className={clsx(robotoFont.className, 'dark text-foreground bg-background')}>
          <InBodyProviderAnalytics>

            <Providers locale={locale}>
              <PageLoaderTop />
              <Navigation />
              <ToastContainerWrapperDynamic />
              <SlidingFooter footer={<Footer />}>{children}</SlidingFooter>
            </Providers>

          </InBodyProviderAnalytics>
        </body>
      </AroundBodyProviderAnalytics>
    </html>
  )
}

const VERCEL_BRANCH_URL = logEnv('VERCEL_BRANCH_URL', process.env.VERCEL_BRANCH_URL)
const VERCEL_URL = logEnv('VERCEL_URL', process.env.VERCEL_URL)
const VERCEL_PROJECT_PRODUCTION_URL = logEnv('VERCEL_PROJECT_PRODUCTION_URL', process.env.VERCEL_PROJECT_PRODUCTION_URL)
const NEXT_PUBLIC_APP_URL = logEnv('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL)

// Based on https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
const metadataBase: string = addHttpIfNeed(
  (isProduction ? VERCEL_PROJECT_PRODUCTION_URL : VERCEL_BRANCH_URL || VERCEL_URL)
  || NEXT_PUBLIC_APP_URL || 'https://eonian.finance/',
)
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
