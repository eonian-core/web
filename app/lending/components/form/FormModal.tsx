import { Divider, Modal, ModalBody, ModalContent, ModalFooter, Tab, Tabs } from '@heroui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import type { FormData } from '../../LendingState'
import { useLendingState } from '../../LendingState'
import { useNumberInputValue } from '../../hooks/useNumberInputValue'
import { FormTab } from './types'
import { FormInput } from './FormInput'
import { FormButton } from './FormButton'
import { FormSlider } from './FormSlider'
import { FormPreview } from './FormPreview'

const MODAL_BACKDROP_SELECTOR = 'backdrop-selector'
const MODAL_WRAPPER_SELECTOR = 'modal-wrapper-selector'

export function FormModal() {
  const { formData } = useLendingState()
  const { screenLTE } = useScreenWidth()

  const { isOpen, onClose } = useModalState()
  const [isRendered, setRendered] = useState(false)

  useEffect(() => {
    if (isOpen)
      setRendered(true)
  }, [isOpen])

  if (!isRendered)
    return null

  return (
    <Modal
      className="lending-styles"
      isOpen={isOpen}
      onClose={onClose}
      placement={screenLTE('laptop') ? 'bottom' : 'center'}
      classNames={{
        wrapper: `${MODAL_WRAPPER_SELECTOR} z-5`,
        backdrop: `${MODAL_BACKDROP_SELECTOR} z-5`,
      }}
      hideCloseButton={true}
      isDismissable={false}
      shouldBlockScroll={false}
      motionProps={{
        onAnimationComplete: () => {
          if (!isOpen)
            setRendered(false)
        },
      }}
      portalContainer={document.getElementById('sliding-content')!}
    >
      {formData && <InnerContent formData={formData} onClose={onClose} />}
    </Modal>
  )
}

function InnerContent({ formData, onClose }: { formData: FormData; onClose: () => void }) {
  const inputData = useNumberInputValue(0n, formData.market.underlyingDecimals)
  return (
    <ModalContent>
      <ModalBody>
        <FormTabs />
        <FormInput formData={formData} inputData={inputData} />
        <FormSlider inputData={inputData} />
        <FormPreview formData={formData} inputData={inputData} />
      </ModalBody>
      <ModalFooter>
        <FormButton inputData={inputData} formData={formData} closeModal={onClose} />
      </ModalFooter>
    </ModalContent>
  )
}

function FormTabs() {
  const { formData, setFormData } = useLendingState()

  return (
    <div className="flex items-center">
      {renderTabs([
        { key: FormTab.SUPPLY, title: 'Supply' },
        { key: FormTab.WITHDRAW, title: 'Withdraw' },
      ])}
      <Divider orientation="vertical" className="h-6" />
      {renderTabs([
        { key: FormTab.BORROW, title: 'Borrow' },
        { key: FormTab.REPAY, title: 'Repay' },
      ])}
    </div>
  )

  // eslint-disable-next-line no-restricted-syntax
  function renderTabs(tabs: Array<{ key: FormTab; title: string }>) {
    if (!formData)
      return null

    return (
      <Tabs
        variant="underlined"
        selectedKey={formData.tab}
        onSelectionChange={key => setFormData({ ...formData, tab: key as FormTab })}
        size="lg"
        fullWidth
      >
        {tabs.map(tab => (
          <Tab key={tab.key} title={tab.title} />
        ))}
      </Tabs>
    )
  }
}

function useModalState(): { isOpen: boolean; onClose: () => void } {
  const { formData, setFormData } = useLendingState()
  const mouseDownOnBackdropRef = useRef(false)

  const onClose = useCallback(() => {
    setFormData(null)
  }, [setFormData])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        setFormData(null)
    }
    window.addEventListener('keydown', handleEscapeKey)
    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [setFormData])

  useEffect(() => {
    const isInside = ({ target }: MouseEvent) => {
      const classes = [MODAL_WRAPPER_SELECTOR, MODAL_BACKDROP_SELECTOR]
      return target instanceof HTMLElement && classes.some(c => target.classList.contains(c))
    }

    const handleMouseDown = (event: MouseEvent) => {
      mouseDownOnBackdropRef.current = isInside(event)
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (mouseDownOnBackdropRef.current && isInside(event))
        onClose()

      mouseDownOnBackdropRef.current = false
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [onClose])

  // Add effect to handle scroll prevention
  useEffect(() => {
    if (!formData)
      return

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    // Prevent scroll on window
    window.addEventListener('scroll', preventScroll, { passive: false })
    // Prevent wheel events
    window.addEventListener('wheel', preventScroll, { passive: false })
    // Prevent touch events
    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      window.removeEventListener('scroll', preventScroll)
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [formData])

  return { isOpen: !!formData, onClose }
}
