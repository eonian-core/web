import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { SuggestChainFormInput } from './suggest-chain-form'
import { SuggestChainForm } from './suggest-chain-form'
import type { EmailFormInput } from './email-form'
import { EmailForm } from './email-form'

import { useInsertChain } from '@/api/suggestions/hooks/useInsertChain'
import { useUpdateChainEmail } from '@/api/suggestions/hooks/useUpdateChainEmail'

export interface SuggestChainFlowProps {
  close: () => void
}

export function SuggestChainFlow({ close }: SuggestChainFlowProps) {
  const [step, setStep] = useState(1)
  const [uuid] = useState<string>(uuidv4())
  const [error, setError] = useState<Error | null>(null)
  const insertChain = useInsertChain()
  const updateChainEmail = useUpdateChainEmail()

  const handleChainSubmit = useCallback(async ({ chain }: SuggestChainFormInput) => {
    try {
      await insertChain(uuid, chain)
      setStep(2)
      setError(null)
    }
    catch (err) {
      setError(err as Error)
    }
  }, [insertChain, uuid])

  const handleEmailSubmit = useCallback(async ({ email }: EmailFormInput) => {
    try {
      await updateChainEmail(uuid, email)
      close()
    }
    catch (err) {
      setError(err as Error)
    }
  }, [updateChainEmail, uuid, close])

  return (
    <>
      {step === 1 && (
        <SuggestChainForm
          error={error}
          onSubmit={handleChainSubmit}
        />
      )}
      {step === 2 && (
        <EmailForm
          error={error}
          onSubmit={handleEmailSubmit}
        />
      )}
    </>
  )
}
