import { motion } from 'framer-motion'

interface Props {
  show: boolean
}

const INITIAL_VAULTS_MOTION = { opacity: 0, y: 50 }

export default function ShowcaseVaults({ show }: Props) {
  return (
    <motion.div
      initial={INITIAL_VAULTS_MOTION}
      transition={{ duration: 0.3 }}
      animate={show ? { opacity: 1, y: 0 } : INITIAL_VAULTS_MOTION}
      className="flex justify-center flex-wrap gap-8"
    >
      <Vault />
      <Vault />
      <Vault />
    </motion.div>
  )
}

function Vault() {
  return <div className="w-[340px] h-[520px] bg-default-600"></div>
}
