import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button as HeroButton } from '@heroui/react'
import styles from './CardActions.module.scss'
import IconDotsVertical from '@/components/icons/icon-dots-vertical'
import Button from '@/components/button/button'

interface Props {
  onSupply: () => void
  onBorrow: () => void
  onWithdraw: () => void
  onRepay: () => void
}

export function CardActions({ onSupply, onBorrow, onWithdraw, onRepay }: Props) {
  return (
    <div className={styles.cardActionsContainer}>
      <Button gradient round size="md" onClick={onSupply} className={styles.actionButton}>
        Supply
      </Button>
      <Button bordered dark round size="md" onClick={onBorrow} className={styles.actionButton}>
        Borrow
      </Button>
      <Dropdown className={styles.dropdownContainer} backdrop="blur">
        <DropdownTrigger>
          <HeroButton color="default" variant="ghost" isIconOnly radius="full" size="md" className={styles.iconButton}>
            <IconDotsVertical className={styles.iconInButton} />
          </HeroButton>
        </DropdownTrigger>
        <DropdownMenu aria-label="Asset actions">
          <DropdownItem onPress={onWithdraw} key="Withdraw">
            Withdraw
          </DropdownItem>
          <DropdownItem onPress={onRepay} key="Repay">
            Repay
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
