/* eslint-disable react/display-name */
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import type { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import React from 'react'
import clsx from 'clsx'
import ExternalLink from '../../../components/links/external-link'
import styles from './partners.module.scss'

import LogoUnibase from './logos/Unibase.svg'
import LogoRido from './logos/Rido.svg'
import GenesisWeb3 from './logos/GenesisWeb3.png'
import Cheersland from './logos/Cheersland.png'
import Bitgert from './logos/Bitgert.png'
import XPBridge from './logos/XPBridge.png'
import AutenticRWA from './logos/AutenticRWA.svg'
import Unibit from './logos/Unibit.webp'
import SaasGo from './logos/SaasGo.png'
import ColdStack from './logos/ColdStack.svg'
import EquationDAO from './logos/EquationDAO.svg'
import HYDT from './logos/HYDT.svg'
import AveAI from './logos/AveAI.png'
import Collaby from './logos/Collaby.png'
import BubbleSwap from './logos/BubbleSwap.png'
import HeLa from './logos/HeLa.svg'
import Fomoin from './logos/Fomoin.svg'
import Poison from './logos/Poison.png'
import Blocknative from './logos/Blocknative.svg'
import OZ from './logos/OZ.webp'
import TheGraph from './logos/TheGraph.svg'
import BSC from './logos/BSC.svg'
import Hardhat from './logos/Hardhat.svg'
import SafeGlobal from './logos/SafeGlobal.svg'

interface ItemProps extends Omit<ImageProps, 'alt' | 'src'> {
  href: string
  alt?: string
  src?: string | StaticImageData
  withLabel?: boolean
  contrast?: number
  width?: number
}

export default function Partners({ children }: React.PropsWithChildren) {
  return <div className={styles.container}>{children}</div>
}

function Sheet({ children }: React.PropsWithChildren) {
  const items = React.Children.toArray(children)
  return (
    <div className={styles.sheet}>
      <ul>
        {[...items, ...items].map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </ul>
    </div>
  )
}

function Item({ src, alt, href, withLabel, children, className, contrast, width, ...restProps }: ItemProps) {
  const itemStyle = {}
  if (contrast !== undefined)
    Object.assign(itemStyle, { '--contrast': String(contrast) })

  const imageStyle = {}
  if (width !== undefined)
    Object.assign(imageStyle, { width })

  const hasChildren = React.Children.count(children) > 0
  return (
    <li className={clsx(styles.item, className)} style={itemStyle}>
      <ExternalLink href={href}>
        {hasChildren ? children : <Image src={src!} alt={alt!} width={width} style={imageStyle} {...restProps} />}
        {withLabel && <span>{alt}</span>}
      </ExternalLink>
    </li>
  )
}

Partners.LogoUnibase = () => (
  <Item href="https://www.unibase.io/" src={LogoUnibase as StaticImageData} alt="Unibase" contrast={0} />
)
Partners.LogoRido = () => <Item href="https://www.rido.io/" src={LogoRido as StaticImageData} alt="Rido" />
Partners.LogoGenesisWeb3 = () => (
  <Item href="https://www.genesisweb3.in/" src={GenesisWeb3} alt="GenesisWeb3" withLabel />
)
Partners.LogoCheersland = () => <Item href="https://cheersland.org/" src={Cheersland} alt="Cheersland" />
Partners.LogoBitgert = () => <Item href="https://bitgert.com/" src={Bitgert} alt="Bitgert" width={150} />
Partners.LogoAxen = () => (
  <Item href="https://axenai.com/">
    <b style={{ fontSize: '1.55em' }}>AXEN</b>
  </Item>
)
Partners.LogoXPNetwork = () => <Item href="https://xp.network/" src={XPBridge} alt="XP Network" />
Partners.LogoAutenticRWA = () => (
  <Item href="https://autentic.capital/" src={AutenticRWA as StaticImageData} alt="Autentic Capital" />
)
Partners.LogoUnibit = () => <Item href="https://www.unibit.app/#home" src={Unibit} alt="Unibit" />
Partners.LogoSaasGo = () => <Item href="https://saasgo.xyz/" src={SaasGo} alt="SaasGo" contrast={0} />
Partners.LogoColdStack = () => <Item href="https://coldstack.io/" src={ColdStack as StaticImageData} alt="ColdStack" />
Partners.LogoEquationDAO = () => (
  <Item href="https://equation.org/" src={EquationDAO as StaticImageData} alt="EquationDAO" />
)
Partners.LogoHYDT = () => <Item href="https://hydtprotocol.com/" src={HYDT as StaticImageData} alt="HYDT" />
Partners.LogoAveAI = () => <Item href="https://ave.ai/home" src={AveAI} alt="Ave AI" withLabel />
Partners.LogoCollaby = () => <Item href="https://www.collably.network/" src={Collaby} alt="Collaby Network" />
Partners.LogoBubbleSwap = () => <Item href="https://bubbleswap.co/" src={BubbleSwap} alt="BubbleSwap" />
Partners.LogoHeLa = () => <Item href="https://helalabs.com/" src={HeLa as StaticImageData} alt="HeLa" width={150} />
Partners.LogoFomoin = () => (
  <Item href="https://fomoin.finance/#/" src={Fomoin as StaticImageData} alt="Fomoin" width={130} />
)
Partners.LogoPoison = () => (
  <Item href="https://poison.finance/" src={Poison} alt="Poison" style={{ width: '100px' }} contrast={0.7} />
)
Partners.LogoBlocknative = () => (
  <Item href="https://www.blocknative.com/" src={Blocknative as StaticImageData} alt="Blocknative" width={150} />
)
Partners.LogoOZ = () => <Item href="https://www.openzeppelin.com/" src={OZ} alt="OpenZeppelin" />
Partners.LogoTheGraph = () => (
  <Item href="https://thegraph.com/" src={TheGraph as StaticImageData} alt="The Graph" width={45} withLabel />
)
Partners.LogoBSC = () => (
  <Item href="https://www.bnbchain.org" src={BSC as StaticImageData} alt="BNB Chain" width={150} />
)
Partners.LogoHardhat = () => (
  <Item href="https://hardhat.org/" src={Hardhat as StaticImageData} alt="Hardhat" width={150} />
)
Partners.LogoSafeGlobal = () => (
  <Item href="https://safe.global/" src={SafeGlobal as StaticImageData} alt="Safe.Global" width={120} />
)

Partners.Sheet = Sheet
Partners.Item = Item
