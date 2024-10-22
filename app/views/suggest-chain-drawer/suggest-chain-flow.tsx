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
  const insertChain = useInsertChain()
  const updateChainEmail = useUpdateChainEmail()

  const handleChainSubmit = useCallback(async ({ chain }: SuggestChainFormInput) => {
    await insertChain(uuid, chain)
    setStep(2)
  }, [])

  const handleEmailSubmit = useCallback(async ({ email }: EmailFormInput) => {
    await updateChainEmail(uuid, email)
    close()
  }, [uuid, close])

  return (
    <>
      {step === 1 && (
        <SuggestChainForm
          onSubmit={handleChainSubmit}
        />
      )}
      {step === 2 && (
        <EmailForm
          onSubmit={handleEmailSubmit}
        />
      )}
    </>
  )
}
