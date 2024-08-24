import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './vault-title.module.scss'
import { WrapperLink } from '@/components/links/wrapper-link'
import { getChainExplorer } from '@/providers/wallet/wrappers/helpers'

export function VaultLinks() {
  return (
    <div className={styles.links}>
      <HowVaultWorks />
      <ContractAddress />
    </div>
  )
}

function HowVaultWorks() {
  return (
    <WrapperLink href="https://docs.eonian.finance/basics/how-eonian-works" withIcon>
      How Vault works?
    </WrapperLink>
  )
}

function ContractAddress() {
  const { vault, chainId } = useVaultContext()
  const url = `${getChainExplorer(chainId)}/address/${vault.address}#code`
  return (
    <WrapperLink href={url} withIcon>
      Smart Contract
    </WrapperLink>
  )
}
