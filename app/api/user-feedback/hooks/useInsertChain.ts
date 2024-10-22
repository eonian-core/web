import { useCallback } from 'react'
import { userFeedbackClient } from '@/api/user-feedback/user-feedback.client'

export function useInsertChain() {
  return useCallback(async (id: string, token: string) => {
    try {
      await userFeedbackClient.insertChain(id, token)
    }
    catch (error) {
      console.error('Error inserting chain:', error)
    }
  }, [])
}
