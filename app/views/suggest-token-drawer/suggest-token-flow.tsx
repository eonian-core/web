import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { SuggestTokenFormInput } from './suggest-token-form'
import { SuggestTokenForm } from './suggest-token-form'
import type { EmailFormInput } from './email-form'
import { EmailForm } from './email-form'
import { useInsertToken } from '@/api/suggestions/hooks/useInsertToken'
import { useUpdateTokenEmail } from '@/api/suggestions/hooks/useUpdateTokenEmail'

export interface SuggestTokenFlowProps {
  close: () => void
}

export function SuggestTokenFlow({ close }: SuggestTokenFlowProps) {
  const [step, setStep] = useState(1)
  const [uuid] = useState<string>(uuidv4())
  const [error, setError] = useState<Error | null>(null)
  const insertToken = useInsertToken()
  const updateEmail = useUpdateTokenEmail()

  const handleTokenSubmit = useCallback(async ({ token }: SuggestTokenFormInput) => {
    try {
      await insertToken(uuid, token)
      setStep(2)
      setError(null)
    }
    catch (err) {
      setError(err as Error)
    }
  }, [insertToken, uuid])

  const handleEmailSubmit = useCallback(async ({ email }: EmailFormInput) => {
    try {
      await updateEmail(uuid, email)
      close()
      setError(null)
    }
    catch (err) {
      setError(err as Error)
    }
  }, [updateEmail, uuid, close])

  return (
    <>
      {step === 1 && (
        <SuggestTokenForm
          onSubmit={handleTokenSubmit}
          error={error}
        />
      )}
      {step === 2 && (
        <EmailForm
          onSubmit={handleEmailSubmit}
          error={error}
        />
      )}
    </>
  )
}
