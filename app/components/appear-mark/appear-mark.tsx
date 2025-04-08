import type { PropsWithChildren } from 'react'
import { Children, createContext, useContext } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { toMs, useDelay } from '../fade-in/fade-in-child-list'
import { useFadeInListContext } from '../fade-in/fade-in-list'
import styles from './appear-mark.module.scss'

export interface AppearMarkContextProps {
  isVisible: boolean
}

const AppearMarkContext = createContext<AppearMarkContextProps>({ isVisible: true })
export const useAppearMarkContext = () => useContext(AppearMarkContext)

export function AppearMarkProvider({ children, isVisible }: PropsWithChildren & AppearMarkContextProps) {
  return <AppearMarkContext.Provider value={{ isVisible }}>
    {children}
  </AppearMarkContext.Provider>
}

export function AppearMarkOnScroll(props: AppearMarkProps) {
  const { isVisible } = useFadeInListContext()

  return (
    <AppearMarkContext.Provider value={{ isVisible }}>
      <AppearMark {...props}/>
    </AppearMarkContext.Provider>
  )
}

export interface AppearMarkProps extends PropsWithChildren {
  /** The delay between appear after child, default 2s */
  delay?: number

  /** Basic typing speed from 1-99 or exact keystroke delay in milseconds */
  speed?: number
}

export function AppearMark({ children, delay = 1.5, speed = 1 }: AppearMarkProps) {
  const [content] = Children.toArray(children)

  const { isVisible } = useAppearMarkContext()
  const delayedIsInView = useDelay(toMs(delay), isVisible)

  if (!delayedIsInView) {
    // render text to get correct height
    return <mark className={styles.defaultMark}>|</mark>
  }

  return (
    <mark>
      <TypeAnimation
            // eh, library do not export required types
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        speed={speed as any}
        sequence={[
          content as string,
        ]}
        cursor={false}
            />
    </mark>
  )
}
