import { useEffect, useRef } from 'react'

interface DrawIntent {
  size: number
  lineWidth: number
  animationStep: number
  value: number
}

export function useChart({ size, value, lineWidth, animationStep }: DrawIntent) {
  const lastProgressesRef = useRef({ outer: 0, inner: 0 })
  const animationHandlerRef = useRef(-1)

  useEffect(() => {
    const canvas = document.getElementById('portfolio-chart')
    if (!canvas)
      return

    const computedStyle = getComputedStyle(canvas)
    const innerColor = computedStyle.getPropertyValue('--color-coverage')
    const outerColorA = computedStyle.getPropertyValue('--color-vault')
    const outerColorB = computedStyle.getPropertyValue('--color-wallet')

    const stop = draw({
      canvas: canvas as HTMLCanvasElement,
      animationHandler: animationHandlerRef.current,
      onAnimationHandlerChange: handler => (animationHandlerRef.current = handler),
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
  }, [animationStep, lineWidth, size, value])
}

interface DrawOptions extends DrawIntent {
  canvas: HTMLCanvasElement
  animationHandler: number
  onAnimationHandlerChange: (handler: number) => void
  outerStartProgress: number
  innerStartProgress: number
  onOuterLastProgress: (progress: number) => void
  onInnerLastProgress: (progress: number) => void
  innerColor: string
  outerColorA: string
  outerColorB: string
}

function draw(options: DrawOptions) {
  const {
    canvas,
    size,
    lineWidth,
    outerStartProgress,
    innerStartProgress,
    onInnerLastProgress,
    onOuterLastProgress,
    onAnimationHandlerChange,
  } = options
  const ctx = canvas.getContext('2d')!

  normalizeRatio(canvas, size)

  const radius = size / 2 - lineWidth / 2
  const x = radius + lineWidth / 2
  const y = radius + lineWidth / 2

  /**
   * The gap angle is the space (margin) between the two arcs of the same chart (circle).
   */
  const gapAngle = (lineWidth * 1.5) / radius

  const state: AnimateState = {
    ...options,
    radius,
    x,
    y,
    gapAngle,
    innerProgress: innerStartProgress,
    outerProgress: outerStartProgress,
  }

  const handler = animate(ctx, state)
  onAnimationHandlerChange(handler)

  return () => {
    cancelAnimationFrame(handler)
    onOuterLastProgress(state.outerProgress)
    onInnerLastProgress(state.innerProgress)
  }
}

export interface AnimateState extends DrawOptions {
  animationHandler: number
  radius: number
  x: number
  y: number
  gapAngle: number
  innerProgress: number
  outerProgress: number
}

function animate(ctx: CanvasRenderingContext2D, state: AnimateState): number {
  const { size, lineWidth } = state
  ctx.save()

  ctx.translate(size / 2, size / 2)
  ctx.rotate((-100 * Math.PI) / 180)
  ctx.translate(-size / 2, -size / 2)

  ctx.clearRect(0, 0, size, size)
  ctx.lineWidth = lineWidth

  ctx.globalCompositeOperation = 'destination-over'
  const isOuterChartDone = drawOuterChart(ctx, state)
  const isInnerChartDone = drawInnerChart(ctx, state)

  ctx.globalCompositeOperation = 'destination-in'
  drawOpacityGradientOverlay(ctx, state)

  ctx.restore()

  const isAnimationDone = isOuterChartDone && isInnerChartDone
  if (isAnimationDone) {
    cancelAnimationFrame(state.animationHandler)
    return -1
  }

  return requestAnimationFrame(() => animate(ctx, state))
}

function drawOpacityGradientOverlay(ctx: CanvasRenderingContext2D, { size }: DrawOptions) {
  const gradient = ctx.createLinearGradient(0, 0, 0, size)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
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

function drawInnerChart(ctx: CanvasRenderingContext2D, state: AnimateState): boolean {
  const { innerColor, size, lineWidth, animationStep, radius, gapAngle } = state
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
  const shift = (((2.5 * 128) / size) * Math.PI) / 180
  const start = shift
  const end = state.innerProgress * Math.PI * 2 - innerGapAngle + shift

  const innerOffset = size / 2

  drawArc(ctx, state, innerColor, start, end, innerOffset, innerOffset, innerRadius)

  const reachTarget = state.innerProgress >= 1

  state.innerProgress = Math.min(state.innerProgress + animationStep, 1)

  return reachTarget
}

function drawOuterChart(ctx: CanvasRenderingContext2D, state: AnimateState): boolean {
  const { outerColorA, outerColorB, animationStep, gapAngle, value, outerStartProgress } = state
  const startA = 0
  const endA = Math.max(Math.min(Math.PI * 2 - gapAngle * 2, state.outerProgress * Math.PI * 2 - gapAngle), 0)

  const startB = endA + gapAngle
  const endB = Math.PI * 2 - gapAngle

  drawArc(ctx, state, outerColorB, startB, endB)
  drawArc(ctx, state, outerColorA, startA, endA)

  let reachTarget = false
  if (outerStartProgress <= value)
    reachTarget = state.outerProgress >= value
  else if (outerStartProgress >= value)
    reachTarget = state.outerProgress <= value

  state.outerProgress += animationStep * (outerStartProgress < value ? 1 : -1)
  state.outerProgress = +state.outerProgress.toFixed(2)

  if (outerStartProgress < value)
    state.outerProgress = state.outerProgress >= value ? value : state.outerProgress
  else if (outerStartProgress > value)
    state.outerProgress = state.outerProgress <= value ? value : state.outerProgress

  state.outerProgress = Math.min(Math.max(state.outerProgress, 0), 1)

  return reachTarget
}

function drawArc(
  ctx: CanvasRenderingContext2D,
  state: AnimateState,
  color: string,
  start: number,
  end: number,
  arcX?: number,
  arcY?: number,
  arcRadius?: number,
) {
  arcX = arcX ?? state.x
  arcY = arcY ?? state.y
  arcRadius = arcRadius ?? state.radius

  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(arcX, arcY, arcRadius, start, end, false)
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.stroke()
}
