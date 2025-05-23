import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button as HeroButton } from '@heroui/react'
import IconDotsVertical from '../../components/icons/icon-dots-vertical'
import { useIsLaptopOrSmaller } from '../../components/resize-hooks/screens'
import styles from './ActionButtons.module.scss'
import Button from '@/components/button/button'

export interface ActionButtonsProps {
  [key: string]: () => void
  onWithdraw: () => void
  onRepay: () => void
  onBorrow: () => void
  onSupply: () => void
}

const buttonLabels: Record<string, string> = {
  onSupply: 'Supply',
  onBorrow: 'Borrow',
  onWithdraw: 'Withdraw',
  onRepay: 'Repay',
}

export function ActionButtons(props: ActionButtonsProps) {
  const keys = Object.keys(props)
  const standaloneKeys = ['onSupply', 'onBorrow']
  const dropdownKeys = ['onWithdraw', 'onRepay']

  const standaloneButtons = keys.filter(button => (standaloneKeys.includes(button)))
  const dropdownButtons = keys.filter(button => (dropdownKeys.includes(button)))

  return (
    <>
      {standaloneButtons.map(button => (
        <Button key={button} bordered dark round size="sm" onClick={props[button]}>
          {buttonLabels[button]}
        </Button>
      ))}
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          {/** heroui Dropdown work only with HeroButton */}
          <HeroButton size="sm" color="default" variant="ghost" isIconOnly radius="full" className={styles.dots}>
            <IconDotsVertical className="text-foreground-50" />
          </HeroButton>
        </DropdownTrigger>
        <DropdownMenu aria-label="Asset actions">
          {dropdownButtons.map(button => (
            <DropdownItem key={button} onPress={props[button]}>
              {buttonLabels[button]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
