import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'
import Heading from '../sticky-problem/components/Heading'
import IconLinkedin from '../../../components/icons/icon-linkedin'

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

export default function Features() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      void animate('li', { opacity: 1, y: [50, 0] }, { delay: stagger(0.1) })
    }
  }, [animate, isInView])

  return (
    <motion.div className="flex flex-col gap-4">
      <Heading tag="h3">Main Features</Heading>
      <ul ref={scope} className="flex flex-wrap gap-4">
        {features.map((data) => {
          return <Chip key={data.name} text={data.name} icon={data.icon} />
        })}
      </ul>
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
