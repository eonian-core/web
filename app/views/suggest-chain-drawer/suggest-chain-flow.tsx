import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SimpleEmailForm, SimpleEmailFormError } from '../simple-email-form/simple-email-form'
import { type OneInputFormState } from '../one-input-form/one-input-form'
import { useAsyncCallbackWithCatch } from '../one-input-form/async-callback-with-catch'
import { SuggestChainForm, SuggestionFormError } from './suggest-chain-form'

import { useInsertChain } from '@/api/suggestions/hooks/useInsertChain'
import { useUpdateChainEmail } from '@/api/suggestions/hooks/useUpdateChainEmail'

export interface SuggestChainFlowProps {
  close: () => void
}

export function SuggestChainFlow({ close }: SuggestChainFlowProps) {
  const [isChainSubmited, setIsChainSumbited] = useState(false)
  const [uuid] = useState<string>(uuidv4())
  const insertChain = useInsertChain()
  const updateChainEmail = useUpdateChainEmail()

  const [handleChainSubmit, chainError] = useAsyncCallbackWithCatch(async ({ input: chain }: OneInputFormState) => {
    await insertChain(uuid, chain)
    setIsChainSumbited(true)
  }, [insertChain, uuid])

  const [handleEmailSubmit, emailError] = useAsyncCallbackWithCatch(async ({ input: email }: OneInputFormState) => {
    await updateChainEmail(uuid, email)
    close()
  }, [updateChainEmail, uuid, close])

  return (
    <>
      {!isChainSubmited
        ? (
        <SuggestChainForm
          error={<SuggestionFormError error={chainError} />}
          onSubmit={handleChainSubmit}
        />
          )
        : (
        <SimpleEmailForm
          error={<SimpleEmailFormError error={emailError} />}
          onSubmit={handleEmailSubmit}
        />
          )}
    </>
  )
}
