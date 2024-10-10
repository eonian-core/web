import { render, screen } from '@testing-library/react'
import ButtonText from './use-button-text'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { FormAction } from '@/store/slices/types'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

const chainId = ChainId.UNKNOWN

describe('ButtonText', () => {
  it('should display "Asset Insurance Required" when not insured', () => {
    render(<ButtonText chainId={chainId} insured={false} status={WalletStatus.CONNECTED} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Asset Insurance Required')).toBeInTheDocument()
  })

  it('should display "Connect wallet" when wallet is not connected', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.NOT_CONNECTED} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Connect wallet')).toBeInTheDocument()
  })

  it('should display "Connecting wallet..." when wallet is connecting', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTING} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Connecting wallet...')).toBeInTheDocument()
  })

  it('should display "Switch to Ethereum" when on a different chain', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} isOnDifferentChain={true} chainName="Ethereum" formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Switch to Ethereum')).toBeInTheDocument()
  })

  it('should display "Switch to BSC" when on a different chain', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} isOnDifferentChain={true} chainName="BSC" formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Switch to BSC')).toBeInTheDocument()
  })

  it('should display "Failed to connect wallet" when wallet is not available', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument()
  })

  it('should display "Enter amount to save" when no input value for deposit', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Enter amount to save')).toBeInTheDocument()
  })

  it('should display "Enter amount to withdraw" when no input value for withdrawal', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={false} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Enter amount to withdraw')).toBeInTheDocument()
  })

  it('should display "Insufficient wallet balance" when not enough assets for deposit', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Insufficient wallet balance')).toBeInTheDocument()
  })

  it('should display "Insufficient account balance" when not enough assets for withdrawal', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={false} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Insufficient account balance')).toBeInTheDocument()
  })

  it('should display refull CTA when not enough assets for gas payment', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={true} haveEnoughForGasPayment={false} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Not enough funds to pay the transaction fee', { exact: false })).toBeInTheDocument()
  })

  it('should display "Save" for deposit action', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={true} haveEnoughForGasPayment={true} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should display "Withdraw" for withdrawal action', () => {
    render(<ButtonText chainId={chainId} insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={true} haveEnoughForGasPayment={true} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Withdraw')).toBeInTheDocument()
  })
})
