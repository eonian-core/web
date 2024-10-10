import { render, screen } from '@testing-library/react'
import ButtonText from './use-button-text'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { FormAction } from '@/store/slices/types'

describe('ButtonText', () => {
  it('should display "Asset Insurance Required" when not insured', () => {
    render(<ButtonText insured={false} status={WalletStatus.CONNECTED} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Asset Insurance Required')).toBeInTheDocument()
  })

  it('should display "Connect wallet" when wallet is not connected', () => {
    render(<ButtonText insured={true} status={WalletStatus.NOT_CONNECTED} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Connect wallet')).toBeInTheDocument()
  })

  it('should display "Connecting wallet..." when wallet is connecting', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTING} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Connecting wallet...')).toBeInTheDocument()
  })

  it('should display "Switch to Etherium" when on a different chain', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} isOnDifferentChain={true} chainName="Etherium" formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Switch to Etherium')).toBeInTheDocument()
  })

  it('should display "Switch to BSC" when on a different chain', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} isOnDifferentChain={true} chainName="BSC" formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Switch to BSC')).toBeInTheDocument()
  })

  it('should display "Failed to connect wallet" when wallet is not available', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument()
  })

  it('should display "Enter amount to save" when no input value for deposit', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Enter amount to save')).toBeInTheDocument()
  })

  it('should display "Enter amount to withdraw" when no input value for withdrawal', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={false} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Enter amount to withdraw')).toBeInTheDocument()
  })

  it('should display "Insufficient wallet balance" when not enough assets for deposit', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={false} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Insufficient wallet balance')).toBeInTheDocument()
  })

  it('should display "Insufficient account balance" when not enough assets for withdrawal', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={false} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Insufficient account balance')).toBeInTheDocument()
  })

  it('should display "Save" for deposit action', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={true} formAction={FormAction.DEPOSIT} />)
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should display "Withdraw" for withdrawal action', () => {
    render(<ButtonText insured={true} status={WalletStatus.CONNECTED} walletAvailable={true} haveInputValue={true} haveEnoughAssets={true} formAction={FormAction.WITHDRAW} />)
    expect(screen.getByText('Withdraw')).toBeInTheDocument()
  })
})
