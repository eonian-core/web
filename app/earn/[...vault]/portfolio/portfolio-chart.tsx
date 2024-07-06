import { ethers } from 'ethers'
import { useLayoutEffect, useRef } from 'react'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './portfolio-chart.module.scss'
import { useAppSelector } from '@/store/hooks'
import type { Vault } from '@/api'

interface Props {
  vault: Vault
  size: number
}
export function PortfolioChart({ vault, size }: Props) {
  const { decimals } = vault.asset

  const { inputValue } = useVaultInputContext()
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const inputDelta = +ethers.formatUnits(inputValue, decimals)
  const walletBalance = +ethers.formatUnits(walletBalanceBN, decimals)
  const vaultBalance = +ethers.formatUnits(vaultBalanceBN, decimals)

  const vaultDelta = vaultBalance + inputDelta
  const walletDelta = Math.max(walletBalance - inputDelta, 0)
  const proportion = vaultDelta / (vaultDelta + walletDelta)
  useChart({
    canvas: canvasRef.current!,
    size: 128,
    value: proportion,
  })

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  )
}

interface DrawIntent {
  canvas: HTMLCanvasElement
  size: number
  value: number
}

function useChart({ canvas, size, value }: DrawIntent) {
  const lastProgressesRef = useRef({ outer: 0, inner: 0 })

  useLayoutEffect(() => {
    if (!canvas)
      return

    const computedStyle = getComputedStyle(canvas)
    const innerColor = computedStyle.getPropertyValue('--color-coverage')
    const outerColorA = computedStyle.getPropertyValue('--color-vault')
    const outerColorB = computedStyle.getPropertyValue('--color-wallet')

    return draw({
      canvas,
      size,
      value,
      outerStartProgress: lastProgressesRef.current.outer,
      innerStartProgress: lastProgressesRef.current.inner,
      onOuterLastProgress: progress => (lastProgressesRef.current.outer = progress),
      onInnerLastProgress: progress => (lastProgressesRef.current.inner = progress),
      innerColor,
      outerColorA,
      outerColorB,
    })
  }, [canvas, size, value])
}

interface DrawOptions extends DrawIntent {
  outerStartProgress: number
  innerStartProgress: number
  onOuterLastProgress: (progress: number) => void
  onInnerLastProgress: (progress: number) => void
  innerColor: string
  outerColorA: string
  outerColorB: string
}

function draw({
  canvas,
  size,
  value,
  outerStartProgress,
  innerStartProgress,
  onInnerLastProgress,
  onOuterLastProgress,
  innerColor,
  outerColorA,
  outerColorB,
}: DrawOptions) {
  const ctx = canvas.getContext('2d')!

  normalizeRatio(canvas, size)

  const offset = Math.PI * 1.425
  const gap = Math.PI * 0.03
  const animationStep = 0.0125
  const lineWidth = 8
  const radius = size / 2 - lineWidth / 2
  const x = radius + lineWidth / 2
  const y = radius + lineWidth / 2

  let innerProgress = innerStartProgress
  let outerProgress = outerStartProgress

  let handler: number = -1

  function drawArc(color: string, start: number, end: number, arcX = x, arcY = y, arcRadius = radius) {
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(arcX, arcY, arcRadius, start, end, false)
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.stroke()
  }

  function drawOuterChart(): boolean {
    const startA = offset
    const endA = Math.max(Math.min(outerProgress, 0.97), 0.03) * Math.PI * 2 + offset

    const startB = endA
    const endB = Math.PI * 2 + offset

    drawArc(outerColorB, startB + gap, endB - gap)
    drawArc(outerColorA, startA + gap, endA - gap)

    outerProgress += animationStep * (outerStartProgress < value ? 1 : -1)
    return Math.abs(outerProgress - value) <= animationStep
  }

  function drawInnerChart(): boolean {
    const start = offset
    const end = Math.max(Math.min(innerProgress, 1), 0.03) * Math.PI * 2 + offset

    const innerRadius = radius - lineWidth - gap * 55
    const innerOffset = size / 2

    drawArc(innerColor, start + gap * 1.25, end - gap * 1.25, innerOffset, innerOffset, innerRadius)

    innerProgress += animationStep
    return innerProgress >= 1
  }

  function drawOpacityGradientOverlay() {
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }

  function animate() {
    ctx.clearRect(0, 0, size, size)
    ctx.lineWidth = lineWidth

    ctx.globalCompositeOperation = 'destination-over'
    const isOuterChartDone = drawOuterChart()
    const isInnerChartDone = drawInnerChart()

    ctx.globalCompositeOperation = 'destination-in'
    drawOpacityGradientOverlay()

    const isAnimationDone = isOuterChartDone && isInnerChartDone
    if (isAnimationDone)
      return cancelAnimationFrame(handler)

    handler = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    onOuterLastProgress(outerProgress)
    onInnerLastProgress(innerProgress)
    cancelAnimationFrame(handler)
  }
}

function normalizeRatio(canvas: HTMLCanvasElement, size: number) {
  const ctx = canvas.getContext('2d')!

  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`

  const scale = window.devicePixelRatio
  canvas.width = size * scale
  canvas.height = size * scale

  ctx.scale(scale, scale)
}
