import { useCallback } from 'react'
import { userFeedbackClient } from '@/api/user-feedback/user-feedback.client'

export function useInsertToken() {
  return useCallback(async (id: string, token: string) => {
    try {
      await userFeedbackClient.insertToken(id, token)
    }
    catch (error) {
      console.error('Error inserting token:', error)
    }
  }, [])
}
