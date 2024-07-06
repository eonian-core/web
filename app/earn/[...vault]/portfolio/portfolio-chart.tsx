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
  const vaultBalance = 0 ?? +ethers.formatUnits(vaultBalanceBN, decimals)

  const vaultDelta = vaultBalance + inputDelta
  const walletDelta = Math.max(walletBalance - inputDelta, 0)
  const proportion = vaultDelta / (vaultDelta + walletDelta)

  useChart({
    canvas: canvasRef.current!,
    size: 196,
    lineWidth: 10,
    animationStep: 0.01,
    value: +proportion.toFixed(2),
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
  lineWidth: number
  animationStep: number
  value: number
}

function useChart({ canvas, size, value, lineWidth, animationStep }: DrawIntent) {
  const lastProgressesRef = useRef({ outer: 0, inner: 0 })

  useLayoutEffect(() => {
    if (!canvas)
      return

    const computedStyle = getComputedStyle(canvas)
    const innerColor = computedStyle.getPropertyValue('--color-coverage')
    const outerColorA = computedStyle.getPropertyValue('--color-vault')
    const outerColorB = computedStyle.getPropertyValue('--color-wallet')

    const stop = draw({
      canvas,
      size,
      value,
      lineWidth,
      animationStep,
      outerStartProgress: lastProgressesRef.current.outer,
      innerStartProgress: lastProgressesRef.current.inner,
      onOuterLastProgress: progress => (lastProgressesRef.current.outer = progress),
      onInnerLastProgress: progress => (lastProgressesRef.current.inner = progress),
      innerColor,
      outerColorA,
      outerColorB,
    })
    return () => stop()
  }, [animationStep, canvas, lineWidth, size, value])
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
  lineWidth,
  animationStep,
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

  const radius = size / 2 - lineWidth / 2
  const x = radius + lineWidth / 2
  const y = radius + lineWidth / 2

  /**
   * The gap angle is the space (margin) between the two arcs of the same chart (circle).
   */
  const gapAngle = lineWidth * 1.5 / radius

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
    const startA = 0
    const endA = Math.max(
      Math.min(
        Math.PI * 2 - gapAngle * 2,
        outerProgress * Math.PI * 2 - gapAngle,
      ),
      0,
    )

    const startB = endA + gapAngle
    const endB = Math.PI * 2 - gapAngle

    drawArc(outerColorB, startB, endB)
    drawArc(outerColorA, startA, endA)

    let reachTarget = false
    if (outerStartProgress < value)
      reachTarget = outerProgress >= value
    else if (outerStartProgress > value)
      reachTarget = outerProgress <= value

    outerProgress += animationStep * (outerStartProgress < value ? 1 : -1)
    outerProgress = +outerProgress.toFixed(2)

    if (outerStartProgress < value)
      outerProgress = outerProgress >= value ? value : outerProgress
    else if (outerStartProgress > value)
      outerProgress = outerProgress <= value ? value : outerProgress

    outerProgress = Math.min(Math.max(outerProgress, 0), 1)

    return reachTarget
  }

  function drawInnerChart(): boolean {
    /**
     * The distance between two circles is dependent on the line width.
     */
    const innerRadius = radius - lineWidth * 1.5

    /**
     * We need to recalculate the gap angle for the inner chart because the radius is different.
     * Otherwise, the gap proportion will be different between the inner and outer charts.
     */
    const innerGapAngle = gapAngle * (radius / innerRadius)

    /**
     * Slightly rotate the inner chart by ~2.5 degrees (depends on the size) to match the outer chart.
     * The magic number 128 is the initial size of the chart on which the rotation was calibrated.
     */
    const shift = (2.5 * 128 / size) * Math.PI / 180
    const start = shift
    const end = innerProgress * Math.PI * 2 - innerGapAngle + shift

    const innerOffset = size / 2

    drawArc(innerColor, start, end, innerOffset, innerOffset, innerRadius)

    const reachTarget = innerProgress >= 1

    innerProgress = Math.min(innerProgress + animationStep, 1)

    return reachTarget
  }

  function drawOpacityGradientOverlay() {
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }

  function animate() {
    ctx.save()

    ctx.translate(size / 2, size / 2)
    ctx.rotate(-100 * Math.PI / 180)
    ctx.translate(-size / 2, -size / 2)

    ctx.clearRect(0, 0, size, size)
    ctx.lineWidth = lineWidth

    ctx.globalCompositeOperation = 'destination-over'
    const isOuterChartDone = drawOuterChart()
    const isInnerChartDone = drawInnerChart()

    ctx.globalCompositeOperation = 'destination-in'
    drawOpacityGradientOverlay()

    ctx.restore()

    const isAnimationDone = isOuterChartDone && isInnerChartDone
    if (isAnimationDone)
      return cancelAnimationFrame(handler)

    handler = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    cancelAnimationFrame(handler)
    onOuterLastProgress(outerProgress)
    onInnerLastProgress(innerProgress)
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
