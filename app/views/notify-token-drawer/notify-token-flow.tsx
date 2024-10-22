import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NotifyTokenForm } from './notify-token-form'
import { NotifyEmailForm } from './notify-email-form'
import { useInsertToken } from '@/api/user-feedback/hooks/useInsertToken'
import { useUpdateTokenEmail } from '@/api/user-feedback/hooks/useUpdateTokenEmail'

interface NotifyTokenFormInput {
  token: string
}

interface NotifyEmailFormInput {
  email: string
}

export interface NotifyTokenFlowProps {
  close: () => void
}

export function NotifyTokenFlow({ close }: NotifyTokenFlowProps) {
  const [step, setStep] = useState(1)
  const [uuid] = useState<string>(uuidv4())
  const insertToken = useInsertToken()
  const updateEmail = useUpdateTokenEmail()

  const handleTokenSubmit = useCallback(async ({ token }: NotifyTokenFormInput) => {
    try {
      await insertToken(uuid, token)
      setStep(2)
    }
    catch (err) {
      console.error('Error sending token:', err)
    }
  }, [insertToken, uuid])

  const handleEmailSubmit = useCallback(async ({ email }: NotifyEmailFormInput) => {
    try {
      await updateEmail(uuid, email)
      close()
    }
    catch (err) {
      console.error('Error updating email:', err)
    }
  }, [updateEmail, uuid, close])

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
