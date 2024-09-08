import { useCallback, useEffect, useRef, useState } from 'react'
import type { NotifyTokenFormInput } from './notify-token-form'
import { NotifyTokenForm } from './notify-token-form'
import type { NotifyEmailFormInput } from './notify-email-form'
import { NotifyEmailForm } from './notify-email-form'
import { notifyEmail, notifyToken } from '@/api/notify-token/notify-token'

export interface LinkRecoveryEmailFlowProps {
  close: () => void
}

export function NotifyTokenFlow({ close }: LinkRecoveryEmailFlowProps) {
  const [step, setStep] = useState(1)
  const [token, setToken] = useState('')
  const tokenRef = useRef(token)

  useEffect(() => {
    tokenRef.current = token
  }, [token])

  const handleTokenSubmit = useCallback(async ({ token }: NotifyTokenFormInput) => {
    await notifyToken(token)
    setStep(2)
    setToken(token)
  }, [])

  const handleEmailSubmit = useCallback(async ({ email }: NotifyEmailFormInput) => {
    await notifyEmail(tokenRef.current, email)
    close()
  }, [close])

  return (
    <>
      {step === 1 && (
        <NotifyTokenForm
          onSubmit={handleTokenSubmit}
        />
      )}
      {step === 2 && (
        <NotifyEmailForm
          onSubmit={handleEmailSubmit}
        />
      )}
    </>
  )
}
//
// export interface SubmitOptions {
//   signAndLink: ReturnType<typeof useNotifyForm>[0]
// }
//
// function useSubmit({
//   signAndLink,
// }: SubmitOptions) {
//   return useCallback(async ({ email }: FormInputs) => {
//
//     await signAndLink({ address, chainId, email })
//   }, [signAndLink, isWalletConnected, address, chainId])
// }
