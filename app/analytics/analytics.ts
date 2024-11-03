import LogRocket from 'logrocket'
import type { AbstractAnalyticsSubscriber } from './abstract-analytics'
import { AbstractAnalyticsPublisher } from './abstract-analytics'
import { clarityAdapter } from './clarity-adapter'

class LogRocketAnalyticsAdapter implements AbstractAnalyticsSubscriber {
  track(eventName: string, payload?: Record<string, any>) {
    LogRocket.track(eventName, payload)
  };

  identify(userId: string, traits?: Record<string, any>) {
    LogRocket.identify(userId, traits)
  };
}

export interface AbstarctTrackEvent {
  pathname?: string
  result?: string
  success?: boolean
  context?: string | null
}

class ClarityAnalyticsAdapter implements AbstractAnalyticsSubscriber {
  track(nodeText: string, { context, result, success }: Record<string, any> | AbstarctTrackEvent = {}) {
    let eventName = typeof context === 'string' ? `${context}/${nodeText}` : nodeText
    if (result !== undefined)
      eventName = `${eventName} result: ${result}`

    if (success !== undefined)
      eventName = `${eventName}: ${success}`

    clarityAdapter.trackEvent(eventName)
  };

  identify(userId: string, traits?: Record<string, any>) {
    // we not have proper mapping between traits and identify in clarity
    // so will use tags for now
    clarityAdapter.trackIdentify({ customId: userId })
    clarityAdapter.trackTag('address', userId)
    clarityAdapter.trackTag('label', (traits?.label || 'unknown') as string)
  };
}

export const analytics = new AbstractAnalyticsPublisher({
  logRocket: new LogRocketAnalyticsAdapter(),
  clarity: new ClarityAnalyticsAdapter(),
})
