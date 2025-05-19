import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import IconDotsVertical from '../../components/icons/icon-dots-vertical'
import { useIsLaptopOrSmaller } from '../../components/resize-hooks/screens'

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
  const isLaptopOrSmaller = useIsLaptopOrSmaller()

  const keys = Object.keys(props)
  const standaloneKeys = ['onSupply', 'onBorrow']
  const dropdownKeys = ['onWithdraw', 'onRepay']

  const standaloneButtons = keys.filter(button => (isLaptopOrSmaller ? false : standaloneKeys.includes(button)))
  const dropdownButtons = keys.filter(button => (isLaptopOrSmaller ? true : dropdownKeys.includes(button)))

  return (
    <>
      {standaloneButtons.map(button => (
        <Button key={button} color="primary" variant="solid" size="sm" onPress={props[button]}>
          {buttonLabels[button]}
        </Button>
      ))}
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="solid" color="primary" className="z-0">
            <IconDotsVertical className="text-foreground-50" />
          </Button>
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
