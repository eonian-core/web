declare global {
  interface Window {
    clarity: (...arr: Array<string | undefined | Array<string>>) => void
  }
}

export class ClarityAdapter {
  getInstance(): ((...arr: Array<string | undefined | Array<string>>) => void) | undefined {
    if (
      typeof window === 'undefined'
            || !window.clarity
            || typeof window.clarity !== 'function'
    )

      return

    return window.clarity
  }

  track(...arr: Array<string | undefined | Array<string>>) {
    const clarity = this.getInstance()
    if (!clarity) {
      console.warn('Clarity is not loaded to publish', ...arr)
      return
    }

    try {
      clarity(...arr)
    }
    catch (error) {
      console.error('Failed to push event to Clarity', ...arr, error)
    }
  }

  trackEvent(name: string) {
    this.track('event', name)
  }

  trackConsent() {
    this.track('consent')
  }

  trachIdentify({ customId, customSessionId, customPageId, friendlyName }: { customId: string; customSessionId?: string; customPageId?: string; friendlyName?: string }) {
    this.track('identify', customId, customSessionId, customPageId, friendlyName)
  }

  trackTag(key: string, value: string | Array<string>) {
    this.track('tag', key, value)
  }
}

export const clarityAdapter = new ClarityAdapter()
