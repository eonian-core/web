import { VaultLinks } from './vault-links'
import { VaultName } from './vault-name'
import { VaultTag, VaultTags, VaultTitle } from './vault-title'
import type { TokenSymbol } from '@/types'

// TODO: move this compoenents to mdx file

export function EthVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Blue-chip</VaultTag>
        <VaultTag>Save and Forget</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="ETH">Ethereum Vault</VaultName>
    </VaultTitle>
  )
}

export function BtcVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Blue-chip</VaultTag>
        <VaultTag>Save and Forget</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="BTCB">Bitcoin Vault</VaultName>
    </VaultTitle>
  )
}

export function BnbVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Save and Forget</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="BNB">BNB Vault</VaultName>
    </VaultTitle>
  )
}

export function UsdtVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Earn Passively</VaultTag>
        <VaultTag>Stable</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="USDT">Tether Vault</VaultName>
    </VaultTitle>
  )
}

export function UsdcVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Earn Passively</VaultTag>
        <VaultTag>Stable</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="USDC">USD Coin Vault</VaultName>
    </VaultTitle>
  )
}

export function DaiVaultTitle() {
  return (
    <VaultTitle>
      <VaultTags>
        <VaultTag>Popular</VaultTag>
        <VaultTag>Tested</VaultTag>
        <VaultTag>Insured</VaultTag>
        <VaultTag>Earn Passively</VaultTag>
        <VaultTag>Stable</VaultTag>
        <VaultLinks />
      </VaultTags>

      <VaultName symbol="DAI">DAI Vault</VaultName>
    </VaultTitle>
  )
}

type FirstLineHeader = {
  [K in TokenSymbol]: React.ComponentType;
}

export const firstLineHeaderMap: FirstLineHeader = {
  BTCB: BtcVaultTitle,
  ETH: EthVaultTitle,
  BNB: BnbVaultTitle,
  USDT: UsdtVaultTitle,
  USDC: UsdcVaultTitle,
  DAI: DaiVaultTitle,
}
