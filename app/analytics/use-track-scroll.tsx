import { analytics } from './analytics'
import { useOnScrollOnce } from '@/components/fade-in/use-on-scroll'

export function useTrackScroll() {
  useOnScrollOnce(() => {
    analytics.track('Scroll started')
  }, [])
}
