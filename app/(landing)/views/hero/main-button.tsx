import IconChevron from '../../../components/icons/icon-chevron'
import IconRobot from '../../../components/icons/icon-robot'
import { useWaitlist } from '../../../providers/waitlist'
import HeroButton from './button-group/hero-button'

/**
 * Main Call to Action (CTA) button on the Hero section.
 */
export function MainButton() {
  const { isJoined, openDashboard } = useWaitlist()

  if (process.env.NEXT_PUBLIC_FEATURE_EARN_PAGE === 'true') {
    return (
            <HeroButton href="/earn" bold>
                Earn
            </HeroButton>
    )
  }

  if (!isJoined) {
    return (
            <HeroButton href="#future-of-investments-is-coming" icon={<IconChevron width="20" height="20" />}>
                Join the Waitlist
            </HeroButton>
    )
  }

  return (
        <HeroButton onClick={openDashboard} icon={<IconRobot />}>
            Open Dashboard
        </HeroButton>
  )
}
