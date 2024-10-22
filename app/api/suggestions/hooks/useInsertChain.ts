import { useCallback } from 'react'
import { suggestionsApi } from '@/api/suggestions/suggestions.api'

export function useInsertChain() {
  return useCallback(async (id: string, token: string) => {
    try {
      await suggestionsApi.insertChain(id, token)
    }
    catch (error) {
      console.error('Error inserting chain:', error)
    }
  }, [])
}
