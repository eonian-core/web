import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import IconDotsVertical from '@/components/icons/icon-dots-vertical'

interface Props {
  onSupply: () => void
  onBorrow: () => void
  onWithdraw: () => void
  onRepay: () => void
}

export function CardActions({ onSupply, onBorrow, onWithdraw, onRepay }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <Button color="primary" variant="solid" size="md" onPress={onSupply} className="flex-1">
        Supply
      </Button>
      <Button color="primary" variant="solid" size="md" onPress={onBorrow} className="flex-1">
        Borrow
      </Button>
      <Dropdown className="flex-1">
        <DropdownTrigger>
          <Button isIconOnly size="md" variant="solid" color="primary" className="z-0">
            <IconDotsVertical className="text-foreground-50" />
          </Button>
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
