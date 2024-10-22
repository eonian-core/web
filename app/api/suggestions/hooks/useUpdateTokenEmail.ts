import { useCallback } from 'react'
import { suggestionsApi } from '@/api/suggestions/suggestions.api'

export function useUpdateTokenEmail() {
  return useCallback(async (id: string, email: string) => {
    try {
      await suggestionsApi.updateTokenWithEmail(id, email)
    }
    catch (error) {
      console.error('Error updating email:', error)
    }
  }, [])
}
