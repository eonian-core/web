import { useCallback } from 'react'
import { userFeedbackClient } from '@/api/user-feedback/user-feedback.client'

export function useUpdateTokenEmail() {
  return useCallback(async (id: string, email: string) => {
    try {
      await userFeedbackClient.updateTokenWithEmail(id, email)
    }
    catch (error) {
      console.error('Error updating email:', error)
    }
  }, [])
}
