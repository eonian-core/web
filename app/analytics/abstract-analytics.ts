/* eslint-disable no-console */
/**
 * Abstract analytics pub/sub class
 * that allow to publish events and
 * distribute them across multiple subscribers.
 * Based on https://github.com/davidwells/analytics
 *  with deeper support for nextjs and posthog.
 */
export class AbstractAnalyticsPublisher {
  constructor(
    /**
     * List of subscribers
     */
    private subscribers: Record<string, AbstractAnalyticsSubscriber> = {},
  ) {}

  public track(eventName: string, payload?: Record<string, any>) {
    Object.values(this.subscribers).forEach((subscriber) => {
      subscriber.track(eventName, payload)
    })
  }

  public identify(userId: string, traits?: Record<string, any>) {
    Object.values(this.subscribers).forEach((subscriber) => {
      subscriber.identify(userId, traits)
    })
    console.debug('User identified as', userId, traits)
  }
}

export interface AbstractAnalyticsSubscriber {
  track: (eventName: string, payload?: Record<string, any>) => void

  identify: (userId: string, traits?: Record<string, any>) => void
}
