import { useCallback } from 'react'
import { suggestionsApi } from '@/api/suggestions/suggestions.api'

export function useUpdateChainEmail() {
  return useCallback(async (id: string, email: string) => {
    await suggestionsApi.updateChainWithEmail(id, email)
  }, [])
}
