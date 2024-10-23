import Script from 'next/script'
import { isProduction } from '@/utils/env'

export function Clarity() {
  if (!isProduction)
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
