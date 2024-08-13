'use client'

import React from 'react'
import { useMonitoringContext } from '../providers/monitoring'
import styles from './layout.module.scss'
import IconDeathX from '@/components/icons/icon-death-x'
import IconRobot from '@/components/icons/icon-robot'
import IconLove from '@/components/icons/icon-love'
import { socialsMap } from '@/socials'

export default function Error({ error }: { error: Error }) {
  const { reportError } = useMonitoringContext()

  // Manually send handled exception to LogRocket
  React.useEffect(() => {
    reportError(error, 'earn')
  }, [reportError, error])

  return (
    <div className={styles.error}>
      <div className={styles.errorBanner}>
        <IconLove className={styles.icon} />
        <IconDeathX className={styles.icon} />
        <IconRobot className={`${styles.icon} ${styles.robotIcon}`} />
      </div>

      <h1>Something went wrong</h1>
      <p className={styles.errorDescription}>
        <b>Death</b> come to app, but we already know! We <b>love</b> you, so some unlicky <b>robot</b> already working on it.
        Relax, it nothing serous. Try to refresh the page or contact our team in <a href={socialsMap.en.Discord.href}>Discord</a> or <a href={socialsMap.en.Telegram.href}>Telegram</a>.
      </p>
      <div className={styles.errorMessage}>
        <h2>Error details</h2>
        <p>{error.message}</p>
      </div>
    </div>
  )
}
