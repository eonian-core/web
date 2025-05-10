import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import IconDotsVertical from '../../components/icons/icon-dots-vertical'
import type { ColumnKey } from '../hooks/useColumns'
import { useScreenWidth } from '../hooks/useScreenWidth'

export interface RowColumnData {
  key: ColumnKey
  label: string
  value: React.ReactNode
}

interface Props {
  onWithdraw?: () => void
  onRepay?: () => void
  onBorrow?: () => void
  onSupply?: () => void
  columns?: RowColumnData[]
}

export function AssetRow({ onWithdraw = () => { }, onRepay = () => { }, onBorrow = () => { }, onSupply = () => { }, columns = [] }: Props) {
  const { screenLTE } = useScreenWidth()

  return (
    <tr className="border-b border-default-700 hover:bg-default-750 transition-colors">
      {columns.map((column, index) => (
        <td key={column.key} className="p-3">
          <div className={`flex items-center ${index === 0 ? 'justify-start' : 'justify-center'}`}>{column.value}</div>
        </td>
      ))}
      <td className="p-3 text-right laptop:min-w-[176px]">
        <div className="flex items-center justify-end gap-2">{renderActionButtons()}</div>
      </td>
    </tr>
  )

  // eslint-disable-next-line no-restricted-syntax
  function renderActionButtons() {
    const buttons: Record<string, () => void> = {
      Supply: onSupply,
      Borrow: onBorrow,
      Withdraw: onWithdraw,
      Repay: onRepay,
    }

    const keys = Object.keys(buttons)
    const standaloneKeys = ['Supply', 'Borrow']
    const dropdownKeys = ['Withdraw', 'Repay']

    const standaloneButtons = keys.filter(button => (screenLTE('laptop') ? false : standaloneKeys.includes(button)))
    const dropdownButtons = keys.filter(button => (screenLTE('laptop') ? true : dropdownKeys.includes(button)))

    return (
      <>
        {standaloneButtons.map(button => (
          <Button key={button} color="primary" variant="solid" size="sm" onPress={buttons[button]}>
            {button}
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
              <DropdownItem key={button} onPress={buttons[button]}>
                {button}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </>
    )
  }
}
