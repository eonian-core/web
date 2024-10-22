import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { NotifyChainFormInput } from './notify-chain-form'
import { NotifyChainForm } from './notify-chain-form'
import type { NotifyEmailFormInput } from './notify-email-form'
import { NotifyEmailForm } from './notify-email-form'

import { useInsertChain } from '@/api/user-feedback/hooks/useInsertChain'
import { useUpdateChainEmail } from '@/api/user-feedback/hooks/useUpdateChainEmail'

export interface NotifyChainFlowProps {
  close: () => void
}

export function NotifyChainFlow({ close }: NotifyChainFlowProps) {
  const [step, setStep] = useState(1)
  const [uuid] = useState<string>(uuidv4())
  const insertChain = useInsertChain()
  const updateChainEmail = useUpdateChainEmail()

  const handleChainSubmit = useCallback(async ({ chain }: NotifyChainFormInput) => {
    await insertChain(uuid, chain)
    setStep(2)
  }, [])

  const handleEmailSubmit = useCallback(async ({ email }: NotifyEmailFormInput) => {
    await updateChainEmail(uuid, email)
    close()
  }, [uuid, close])

  return (
    <>
      {step === 1 && (
        <NotifyChainForm
          onSubmit={handleChainSubmit}
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
