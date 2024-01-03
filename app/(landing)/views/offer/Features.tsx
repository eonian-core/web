import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'
import Heading from '../sticky-problem/components/Heading'
import IconLinkedin from '../../../components/icons/icon-linkedin'
import ExternalLink from '../../../components/links/external-link'
import IconExternal from '../../../components/icons/icon-external'

const features = [
  { name: 'Save and forget', icon: <IconLinkedin /> },
  { name: 'Highest transparency', icon: <IconLinkedin /> },
  { name: 'Insure from hacks', icon: <IconLinkedin /> },
  { name: 'Innovation', icon: <IconLinkedin /> },
  { name: 'Your backup plan', icon: <IconLinkedin /> },
  { name: 'Grow long-term', icon: <IconLinkedin /> },
  { name: 'Own your money', icon: <IconLinkedin /> },
  { name: 'Future of finance', icon: <IconLinkedin /> },
  { name: 'Control protocol', icon: <IconLinkedin /> },
  { name: 'Passive income', icon: <IconLinkedin /> },
  { name: 'Stay anonymous', icon: <IconLinkedin /> },
  { name: 'Decentralized', icon: <IconLinkedin /> },
  { name: 'Easy to use', icon: <IconLinkedin /> },
  { name: 'Keep your wallet', icon: <IconLinkedin /> },
]

interface Props {
  onAnimationEnd: (finish: boolean) => void
}

export default function Features({ onAnimationEnd }: Props) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (!isInView) {
      return
    }
    async function startAnimation() {
      await animate('li', { opacity: 1, y: [50, 0] }, { delay: stagger(0.1) })
      await animate('#litepaper-link', { opacity: 1 })
      onAnimationEnd(true)
    }
    void startAnimation()
  }, [animate, isInView, onAnimationEnd])

  return (
    <motion.div ref={scope} className="flex flex-col gap-4">
      <Heading tag="h3">Main Features</Heading>
      <ul className="flex flex-wrap gap-4">
        {features.map((data) => {
          return <Chip key={data.name} text={data.name} icon={data.icon} />
        })}
      </ul>
      <LitepaperLink />
    </motion.div>
  )
}

interface ChipProps {
  text: string
  icon: React.ReactNode
}

function Chip({ text, icon }: ChipProps) {
  return (
    <motion.li className="px-4 py-1.5 rounded-xl opacity-0 flex items-center gap-2 text-foreground bg-default-400 border-medium border-primary text-medium">
      {icon}
      {text}
    </motion.li>
  )
}

function LitepaperLink() {
  return (
    <motion.div id="litepaper-link" className="opacity-0">
      <ExternalLink icon={<IconExternal />} iconAtEnd href={'/'}>
        Learn more in Litepaper
      </ExternalLink>
    </motion.div>
  )
}
