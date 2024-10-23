import { useCallback } from 'react'
import { suggestionsApi } from '@/api/suggestions/suggestions.api'

export function useUpdateTokenEmail() {
  return useCallback(async (id: string, email: string) => {
    await suggestionsApi.updateTokenWithEmail(id, email)
  }, [])
}
