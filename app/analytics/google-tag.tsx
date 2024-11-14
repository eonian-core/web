import React from 'react'

import Script from 'next/script'

// not allow lazy load component
import { logEnv } from '@/utils/env'

export interface GoogleTagProps {
  measurementId?: string
}

const NEXT_PUBLIC_GT_MEASUREMENT_ID = logEnv('NEXT_PUBLIC_GT_MEASUREMENT_ID', process.env.NEXT_PUBLIC_GT_MEASUREMENT_ID)

/** Paste this code as high in the <head> of the page as possible */
export function GoogleTagHead({ measurementId }: GoogleTagProps) {
  const _measurementId = NEXT_PUBLIC_GT_MEASUREMENT_ID ?? measurementId
  if (!_measurementId)
    return null

  return (
        <Script id="google-tag">
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${_measurementId}');
            `}
        </Script>
  )
}

/** Paste this code immediately after the opening <body> tag */
export function GoogleTagFooter({ measurementId }: GoogleTagProps) {
  const _measurementId = NEXT_PUBLIC_GT_MEASUREMENT_ID ?? measurementId
  if (!_measurementId)
    return null

  return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${_measurementId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}>
            </iframe>
        </noscript>
  )
}
