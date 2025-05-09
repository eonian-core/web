import { Button } from '@heroui/react'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export function ConnectButton() {
  const { connect, disconnect, status, wallet } = useWalletWrapperContext()

  const handleButtonClick = () => {
    if (status === WalletStatus.CONNECTED)
      void disconnect()
    else
      void connect()
  }

  const getButtonText = () => {
    switch (status) {
      case WalletStatus.CONNECTED:
        return wallet?.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Disconnect'
      case WalletStatus.CONNECTING:
        return 'Connecting...'
      default:
        return 'Connect Wallet'
    }
  }

  return (
    <div className="w-full mb-6 px-8 py-6 flex justify-end border-b-1 border-foreground-900">
      <Button
        color="primary"
        onClick={handleButtonClick}
        isLoading={status === WalletStatus.CONNECTING}
        isDisabled={status === WalletStatus.CONNECTING}
      >
        {getButtonText()}
      </Button>
    </div>
  )
}
