'use client'

import { H2, H3 } from '../../components/heading/heading'
import Mbr from '@/components/mobile-break/mobile-break'

export function Header() {
  return <div>
        <H2>Select Cryptocurrency</H2>
        <H3>Choose an asset to save and <Mbr start="mobile"> generate passive income</Mbr></H3>
    </div>
}
