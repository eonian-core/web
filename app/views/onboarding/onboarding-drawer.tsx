import { useCallback } from 'react'
import { Onboading } from './onboarding'
import styles from './onboarding-drawer.module.scss'
import { Drawer } from '@/components/drawer/drawer'

export function OnboardingDrawer(props: { opened: boolean; onClose: () => void }) {
  const handleButtonClick = useCallback(() => {
    props.onClose()
  }, [props.onClose])

  return (
        <Drawer
            title={'Onboarding'}
            desktopPosition='left'
            desktopSize='sm'
            {...props}
        >
            <div className={styles.container}>
                <Onboading show onButtonClick={handleButtonClick}/>
            </div>
        </Drawer>
  )
}
