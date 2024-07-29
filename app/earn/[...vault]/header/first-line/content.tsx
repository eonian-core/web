import { TokenSymbol } from "@/types";
import { VaultName, VaultTag, VaultTags, VaultTitle } from "./vault-title";

// TODO: move this compoenents to mdx file

export function EthVaultTitle() {
    return (
        <VaultTitle>
            <VaultTags>
                <VaultTag>Popular</VaultTag>
                <VaultTag>Tested</VaultTag>
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Blue-chip</VaultTag>
                <VaultTag>Save and Forget</VaultTag>
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
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Blue-chip</VaultTag>
                <VaultTag>Save and Forget</VaultTag>
            </VaultTags>

            <VaultName symbol="BTC">Bitcoin Vault</VaultName>
        </VaultTitle>
    )
}

export function BnbVaultTitle() {
    return (
        <VaultTitle>
            <VaultTags>
                <VaultTag>Popular</VaultTag>
                <VaultTag>Tested</VaultTag>
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Save and Forget</VaultTag>
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
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Earn Passively</VaultTag>
                <VaultTag>Stable</VaultTag>
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
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Earn Passively</VaultTag>
                <VaultTag>Stable</VaultTag>
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
                <VaultTag>Zero Fee Insurance</VaultTag>
                <VaultTag>Earn Passively</VaultTag>
                <VaultTag>Stable</VaultTag>
            </VaultTags>

            <VaultName symbol="DAI">DAI Vault</VaultName>
        </VaultTitle>
    )
}

type VaultTitle = {
    [K in TokenSymbol]: React.ComponentType
}

export const vaultTitleMap: VaultTitle = {
    BTC: BtcVaultTitle,
    ETH: EthVaultTitle,
    BNB: BnbVaultTitle,
    USDT: UsdtVaultTitle,
    USDC: UsdcVaultTitle,
    DAI: DaiVaultTitle,
}