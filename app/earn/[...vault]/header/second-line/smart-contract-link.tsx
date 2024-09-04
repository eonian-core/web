import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './smart-contract-link.module.scss'
import { WrapperLink } from '@/components/links/wrapper-link'
import { getChainExplorer } from '@/providers/wallet/wrappers/helpers'

export function SmartContractLink() {
  const { vault, chainId } = useVaultContext()
  const url = `${getChainExplorer(chainId)}/address/${vault.address}#code`
  return (
    <WrapperLink className={styles.container} href={url} withIcon>
      Vault Smart Contract
    </WrapperLink>
  )
}
