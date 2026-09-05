"use client"

import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type Key, type ReactNode } from "react"
import "./logo-loop.css"

type NodeLogoItem = { node: ReactNode; title?: string; href?: string; ariaLabel?: string }
type ImageLogoItem = { src: string; alt?: string; title?: string; href?: string; ariaLabel?: string; srcSet?: string; sizes?: string; width?: number; height?: number }
type LogoItem = NodeLogoItem | ImageLogoItem

type LogoLoopProps = {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right" | "up" | "down"
  width?: number | string
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoItem, key: Key) => ReactNode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

const animationConfig = { smoothTau: 0.25, minCopies: 2, copyHeadroom: 2 }
const toCssLength = (value: number | string | undefined) => typeof value === "number" ? `${value}px` : value

function useResizeObserver(callback: () => void, refs: React.RefObject<HTMLElement | null>[], dependencies: unknown[]) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", callback)
      callback()
      return () => window.removeEventListener("resize", callback)
    }

    const observers = refs.map((ref) => {
      if (!ref.current) return null
      const observer = new ResizeObserver(callback)
      observer.observe(ref.current)
      return observer
    })
    callback()
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [callback, refs, dependencies])
}

function useImageLoader(seqRef: React.RefObject<HTMLElement | null>, onLoad: () => void, dependencies: unknown[]) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? []
    if (!images.length) {
      onLoad()
      return
    }

    let remaining = images.length
    const handleLoad = () => {
      remaining -= 1
      if (!remaining) onLoad()
    }
    images.forEach((image) => image.complete ? handleLoad() : (image.addEventListener("load", handleLoad, { once: true }), image.addEventListener("error", handleLoad, { once: true })))
    return () => images.forEach((image) => { image.removeEventListener("load", handleLoad); image.removeEventListener("error", handleLoad) })
  }, [dependencies, onLoad, seqRef])
}

function useAnimationLoop(trackRef: React.RefObject<HTMLDivElement | null>, targetVelocity: number, seqWidth: number, seqHeight: number, isHovered: boolean, hoverSpeed: number | undefined, isVertical: boolean) {
  const animationFrame = useRef<number | null>(null)
  const lastTimestamp = useRef<number | null>(null)
  const offset = useRef(0)
  const velocity = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const sequenceSize = isVertical ? seqHeight : seqWidth

    const setTransform = () => {
      track.style.transform = isVertical ? `translate3d(0, ${-offset.current}px, 0)` : `translate3d(${-offset.current}px, 0, 0)`
    }

    if (sequenceSize > 0) {
      offset.current = ((offset.current % sequenceSize) + sequenceSize) % sequenceSize
      setTransform()
    }

    const animate = (timestamp: number) => {
      if (lastTimestamp.current === null) lastTimestamp.current = timestamp
      const deltaTime = Math.max(0, timestamp - lastTimestamp.current) / 1000
      lastTimestamp.current = timestamp
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      velocity.current += (target - velocity.current) * (1 - Math.exp(-deltaTime / animationConfig.smoothTau))

      if (sequenceSize > 0) {
        offset.current = ((offset.current + velocity.current * deltaTime) % sequenceSize + sequenceSize) % sequenceSize
        setTransform()
      }
      animationFrame.current = requestAnimationFrame(animate)
    }

    animationFrame.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
      animationFrame.current = null
      lastTimestamp.current = null
    }
  }, [hoverSpeed, isHovered, isVertical, seqHeight, seqWidth, targetVelocity, trackRef])
}

export const LogoLoop = memo(function LogoLoop({ logos, speed = 120, direction = "left", width = "100%", logoHeight = 28, gap = 32, pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor, scaleOnHover = false, renderItem, ariaLabel = "Partner logos", className, style }: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLUListElement>(null)
  const [sequenceWidth, setSequenceWidth] = useState(0)
  const [sequenceHeight, setSequenceHeight] = useState(0)
  const [copyCount, setCopyCount] = useState(animationConfig.minCopies)
  const [isHovered, setIsHovered] = useState(false)
  const isVertical = direction === "up" || direction === "down"

  const effectiveHoverSpeed = useMemo(() => hoverSpeed ?? (pauseOnHover === false ? undefined : 0), [hoverSpeed, pauseOnHover])
  const targetVelocity = useMemo(() => {
    const directionMultiplier = isVertical ? (direction === "up" ? 1 : -1) : (direction === "left" ? 1 : -1)
    return Math.abs(speed) * directionMultiplier * (speed < 0 ? -1 : 1)
  }, [direction, isVertical, speed])

  const updateDimensions = useCallback(() => {
    const container = containerRef.current
    const sequence = sequenceRef.current
    if (!container || !sequence) return
    const rect = sequence.getBoundingClientRect()
    if (isVertical && rect.height > 0) {
      const parentHeight = container.parentElement?.clientHeight ?? 0
      if (parentHeight > 0) container.style.height = `${Math.ceil(parentHeight)}px`
      setSequenceHeight(Math.ceil(rect.height))
      setCopyCount(Math.max(animationConfig.minCopies, Math.ceil((container.clientHeight || parentHeight) / rect.height) + animationConfig.copyHeadroom))
    } else if (!isVertical && rect.width > 0) {
      setSequenceWidth(Math.ceil(rect.width))
      setCopyCount(Math.max(animationConfig.minCopies, Math.ceil(container.clientWidth / rect.width) + animationConfig.copyHeadroom))
    }
  }, [isVertical])

  useResizeObserver(updateDimensions, [containerRef, sequenceRef], [logos, gap, logoHeight, isVertical])
  useImageLoader(sequenceRef, updateDimensions, [logos, gap, logoHeight, isVertical])
  useAnimationLoop(trackRef, targetVelocity, sequenceWidth, sequenceHeight, isHovered, effectiveHoverSpeed, isVertical)

  const renderLogo = useCallback((item: LogoItem, key: Key) => {
    if (renderItem) return <li className="logoloop__item" key={key}>{renderItem(item, key)}</li>
    const isNodeItem = "node" in item
    const content = isNodeItem
      ? <span className="logoloop__node" aria-hidden={Boolean(item.href && !item.ariaLabel)}>{item.node}</span>
      : <img src={item.src} srcSet={item.srcSet} sizes={item.sizes} width={item.width} height={item.height} alt={item.alt ?? ""} title={item.title} loading="lazy" decoding="async" draggable={false} />
    const label = isNodeItem ? (item.ariaLabel ?? item.title) : (item.ariaLabel ?? item.alt ?? item.title)
    return <li className="logoloop__item" key={key}>{item.href ? <a className="logoloop__link" href={item.href} aria-label={label || "Partner link"} target="_blank" rel="noreferrer noopener">{content}</a> : content}</li>
  }, [renderItem])

  const lists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => <ul className="logoloop__list" key={`copy-${copyIndex}`} aria-hidden={copyIndex > 0} ref={copyIndex === 0 ? sequenceRef : undefined}>{logos.map((item, itemIndex) => renderLogo(item, `${copyIndex}-${itemIndex}`))}</ul>), [copyCount, logos, renderLogo])
  const rootClassName = ["logoloop", isVertical ? "logoloop--vertical" : "logoloop--horizontal", fadeOut && "logoloop--fade", scaleOnHover && "logoloop--scale-hover", className].filter(Boolean).join(" ")
  const rootStyle = { width: isVertical && toCssLength(width) === "100%" ? undefined : (toCssLength(width) ?? "100%"), "--logoloop-gap": `${gap}px`, "--logoloop-logoHeight": `${logoHeight}px`, ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}), ...style } as CSSProperties

  return <div ref={containerRef} className={rootClassName} style={rootStyle} role="region" aria-label={ariaLabel}><div className="logoloop__track" ref={trackRef} onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)} onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}>{lists}</div></div>
})

export default LogoLoop
