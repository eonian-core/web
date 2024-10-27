import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type OneInputFormState } from '../one-input-form/one-input-form'
import { useAsyncCallbackWithCatch } from '../one-input-form/async-callback-with-catch'
import { SimpleEmailForm, SimpleEmailFormError } from '../simple-email-form/simple-email-form'
import { SuggestionFormError } from '../suggest-chain-drawer/suggest-chain-form'
import { SuggestTokenForm } from './suggest-token-form'
import { useInsertToken } from '@/api/suggestions/hooks/useInsertToken'
import { useUpdateTokenEmail } from '@/api/suggestions/hooks/useUpdateTokenEmail'

export interface SuggestTokenFlowProps {
  close: () => void
}

export function SuggestTokenFlow({ close }: SuggestTokenFlowProps) {
  const [isTokenSubmited, setTokenSubmited] = useState(false)
  const [uuid] = useState<string>(uuidv4())
  const insertToken = useInsertToken()
  const updateEmail = useUpdateTokenEmail()

  const [handleTokenSubmit, tokenError] = useAsyncCallbackWithCatch(async ({ input: token }: OneInputFormState) => {
    await insertToken(uuid, token)
    setTokenSubmited(true)
  }, [insertToken, uuid, setTokenSubmited])

  const [handleEmailSubmit, emailError] = useAsyncCallbackWithCatch(async ({ input: email }: OneInputFormState) => {
    await updateEmail(uuid, email)
    close()
  }, [updateEmail, uuid, close])

  return (<>
      {!isTokenSubmited
        ? (
          <SuggestTokenForm
            onSubmit={handleTokenSubmit}
            error={<SuggestionFormError error={tokenError} />}
          />
          )
        : (
          <SimpleEmailForm
            onSubmit={handleEmailSubmit}
            error={<SimpleEmailFormError error={emailError} />}
          />
          )}
  </>)
}
