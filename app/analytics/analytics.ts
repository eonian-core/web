import LogRocket from 'logrocket'
import posthog from 'posthog-js'
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

  tag(tags: Record<string, string>) {
    Object.entries(tags).forEach(([key, value]) => {
      LogRocket.track(key, { value })
    })
  };
}

class PosthogAnalyticsAdapter implements AbstractAnalyticsSubscriber {
  track(eventName: string, payload?: Record<string, any>) {
    posthog.capture(eventName, payload)
  };

  identify(userId: string, traits?: Record<string, any>) {
    posthog.identify(userId, traits)
  };

  tag(tags: Record<string, string>) {
    posthog.setPersonProperties(tags)
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

  tag(tags: Record<string, string>) {
    Object.entries(tags).forEach(([key, value]) => {
      clarityAdapter.trackTag(key, value)
    })
  };
}

export const analytics = new AbstractAnalyticsPublisher({
  logRocket: new LogRocketAnalyticsAdapter(),
  posthog: new PosthogAnalyticsAdapter(),
  clarity: new ClarityAnalyticsAdapter(),
})
