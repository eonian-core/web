import React from 'react'

import { interFont } from '../../../../shared/fonts/Inter'

export default function HeroCaptionText({ children }: React.PropsWithChildren) {
  return <h1 className={interFont.className}>{children}</h1>
}
