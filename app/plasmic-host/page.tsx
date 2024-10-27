import * as React from 'react'
import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs'

import '../providers/plasmic-init-client'

export default function PlasmicHost() {
  return <PlasmicCanvasHost />
}
