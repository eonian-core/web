import { useCallback } from 'react'
import { suggestionsApi } from '@/api/suggestions/suggestions.api'

export function useInsertToken() {
  return useCallback(async (id: string, token: string) => {
    try {
      await suggestionsApi.insertToken(id, token)
    }
    catch (error) {
      console.error('Error inserting token:', error)
    }
  }, [])
}
