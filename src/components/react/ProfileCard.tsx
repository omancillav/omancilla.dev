import { memo, useCallback, useEffect, useMemo, useRef, type CSSProperties } from 'react'
import './ProfileCard.css'

interface ProfileCardProps {
  avatarUrl: string
  iconUrl?: string
  grainUrl?: string
  innerGradient?: string
  behindGlowEnabled?: boolean
  behindGlowColor?: string
  behindGlowSize?: string
  className?: string
  enableTilt?: boolean
  enableTouchTilt?: boolean
  enableMobileTilt?: boolean
  mobileTiltSensitivity?: number
  miniAvatarUrl?: string
  name?: string
  title?: string
  handle?: string
  status?: string
  contactText?: string
  showUserInfo?: boolean
  onContactClick?: () => void
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void
  setTarget: (x: number, y: number) => void
  toCenter: () => void
  beginInitial: (durationMs: number) => void
  getCurrent: () => { x: number, y: number, targetX: number, targetY: number }
  cancel: () => void
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const COARSE_POINTER_QUERY = '(pointer: coarse)'

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max)
const round = (value: number, precision = 3) => Number.parseFloat(value.toFixed(precision))
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))

function ProfileCardComponent ({
  avatarUrl,
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(14, 165, 233, 0.62)',
  behindGlowSize = '50%',
  className = '',
  enableTilt = true,
  enableTouchTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Omar Mancilla',
  title = 'FullStack Developer',
  handle = 'omancilla',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}: ProfileCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const enterTimerRef = useRef<number | null>(null)
  const leaveFrameRef = useRef<number | null>(null)
  const activePointerRef = useRef<number | null>(null)

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null

    let frameId: number | null = null
    let running = false
    let lastTimestamp = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let initialUntil = 0

    const setVariables = (x: number, y: number) => {
      const shell = shellRef.current
      const wrapper = wrapperRef.current
      if (!shell || !wrapper) return

      const percentX = clamp((100 / (shell.clientWidth || 1)) * x)
      const percentY = clamp((100 / (shell.clientHeight || 1)) * y)
      const centerX = percentX - 50
      const centerY = percentY - 50
      const variables = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 4))}deg`,
        '--rotate-y': `${round(centerY / 3.2)}deg`
      }

      Object.entries(variables).forEach(([property, value]) => wrapper.style.setProperty(property, value))
    }

    const step = (timestamp: number) => {
      if (!running) return
      if (lastTimestamp === 0) lastTimestamp = timestamp

      const delta = (timestamp - lastTimestamp) / 1000
      const easing = 1 - Math.exp(-delta / (timestamp < initialUntil ? 0.6 : 0.14))
      lastTimestamp = timestamp
      currentX += (targetX - currentX) * easing
      currentY += (targetY - currentY) * easing
      setVariables(currentX, currentY)

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frameId = window.requestAnimationFrame(step)
      } else {
        running = false
        lastTimestamp = 0
        frameId = null
      }
    }

    const start = () => {
      if (running) return
      running = true
      lastTimestamp = 0
      frameId = window.requestAnimationFrame(step)
    }

    return {
      setImmediate (x, y) {
        currentX = x
        currentY = y
        setVariables(x, y)
      },
      setTarget (x, y) {
        targetX = x
        targetY = y
        start()
      },
      toCenter () {
        const shell = shellRef.current
        if (shell) this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2)
      },
      beginInitial (durationMs) {
        initialUntil = window.performance.now() + durationMs
        start()
      },
      getCurrent () {
        return { x: currentX, y: currentY, targetX, targetY }
      },
      cancel () {
        if (frameId) window.cancelAnimationFrame(frameId)
        frameId = null
        running = false
        lastTimestamp = 0
      }
    }
  }, [enableTilt])

  const getOffsets = useCallback((event: PointerEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }, [])

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const shell = shellRef.current
    if (!shell || !tiltEngine) return
    const { x, y } = getOffsets(event, shell)
    tiltEngine.setTarget(x, y)
  }, [getOffsets, tiltEngine])

  const handlePointerEnter = useCallback((event: PointerEvent) => {
    const shell = shellRef.current
    if (!shell || !tiltEngine) return

    shell.classList.add('active', 'entering')
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
    enterTimerRef.current = window.setTimeout(() => shell.classList.remove('entering'), 180)
    const { x, y } = getOffsets(event, shell)
    tiltEngine.setTarget(x, y)
  }, [getOffsets, tiltEngine])

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current
    if (!shell || !tiltEngine) return

    tiltEngine.toCenter()
    const checkSettle = () => {
      const { x, y, targetX, targetY } = tiltEngine.getCurrent()
      if (Math.hypot(targetX - x, targetY - y) < 0.6) {
        shell.classList.remove('active')
        leaveFrameRef.current = null
        return
      }
      leaveFrameRef.current = window.requestAnimationFrame(checkSettle)
    }

    if (leaveFrameRef.current) window.cancelAnimationFrame(leaveFrameRef.current)
    leaveFrameRef.current = window.requestAnimationFrame(checkSettle)
  }, [tiltEngine])

  const handleTouchPointerDown = useCallback((event: PointerEvent) => {
    const shell = shellRef.current
    if (!shell || !tiltEngine || !event.isPrimary) return

    activePointerRef.current = event.pointerId
    shell.setPointerCapture(event.pointerId)
    shell.classList.add('active', 'entering')
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
    enterTimerRef.current = window.setTimeout(() => shell.classList.remove('entering'), 180)
    const { x, y } = getOffsets(event, shell)
    tiltEngine.setTarget(x, y)
  }, [getOffsets, tiltEngine])

  const handleTouchPointerMove = useCallback((event: PointerEvent) => {
    const shell = shellRef.current
    if (!shell || !tiltEngine || activePointerRef.current !== event.pointerId) return

    const { x, y } = getOffsets(event, shell)
    tiltEngine.setTarget(x, y)
  }, [getOffsets, tiltEngine])

  const handleTouchPointerEnd = useCallback((event: PointerEvent) => {
    const shell = shellRef.current
    if (!shell || activePointerRef.current !== event.pointerId) return

    activePointerRef.current = null
    if (shell.hasPointerCapture(event.pointerId)) shell.releasePointerCapture(event.pointerId)
    handlePointerLeave()
  }, [handlePointerLeave])

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    const shell = shellRef.current
    if (!shell || !tiltEngine || event.beta == null || event.gamma == null) return

    const x = clamp(shell.clientWidth / 2 + event.gamma * mobileTiltSensitivity, 0, shell.clientWidth)
    const y = clamp(shell.clientHeight / 2 + (event.beta - 20) * mobileTiltSensitivity, 0, shell.clientHeight)
    tiltEngine.setTarget(x, y)
  }, [mobileTiltSensitivity, tiltEngine])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell || !tiltEngine || window.matchMedia(REDUCED_MOTION_QUERY).matches) return

    const hasCoarsePointer = window.matchMedia(COARSE_POINTER_QUERY).matches
    if (!hasCoarsePointer) {
      shell.addEventListener('pointerenter', handlePointerEnter)
      shell.addEventListener('pointermove', handlePointerMove)
      shell.addEventListener('pointerleave', handlePointerLeave)
    } else if (enableTouchTilt) {
      shell.addEventListener('pointerdown', handleTouchPointerDown)
      shell.addEventListener('pointermove', handleTouchPointerMove)
      shell.addEventListener('pointerup', handleTouchPointerEnd)
      shell.addEventListener('pointercancel', handleTouchPointerEnd)
    }

    const enableOrientation = async () => {
      if (!enableMobileTilt || !hasCoarsePointer || window.location.protocol !== 'https:') return

      try {
        const motionEvent = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
          requestPermission?: () => Promise<'granted' | 'denied'>
        }
        const permission = motionEvent.requestPermission ? await motionEvent.requestPermission() : 'granted'
        if (permission === 'granted') window.addEventListener('deviceorientation', handleDeviceOrientation)
      } catch {
        return
      }
    }

    if (enableMobileTilt) shell.addEventListener('click', enableOrientation)

    if (!hasCoarsePointer) {
      tiltEngine.setImmediate(shell.clientWidth - 70, 60)
      tiltEngine.toCenter()
      tiltEngine.beginInitial(1200)
    }

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter)
      shell.removeEventListener('pointermove', handlePointerMove)
      shell.removeEventListener('pointerleave', handlePointerLeave)
      shell.removeEventListener('pointerdown', handleTouchPointerDown)
      shell.removeEventListener('pointermove', handleTouchPointerMove)
      shell.removeEventListener('pointerup', handleTouchPointerEnd)
      shell.removeEventListener('pointercancel', handleTouchPointerEnd)
      shell.removeEventListener('click', enableOrientation)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
      if (leaveFrameRef.current) window.cancelAnimationFrame(leaveFrameRef.current)
      tiltEngine.cancel()
      activePointerRef.current = null
      shell.classList.remove('active', 'entering')
    }
  }, [
    enableMobileTilt,
    enableTouchTilt,
    handleDeviceOrientation,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    handleTouchPointerDown,
    handleTouchPointerEnd,
    handleTouchPointerMove,
    tiltEngine
  ])

  const cardStyle = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
    '--inner-gradient': innerGradient,
    '--behind-glow-color': behindGlowColor,
    '--behind-glow-size': behindGlowSize
  }) as CSSProperties, [behindGlowColor, behindGlowSize, grainUrl, iconUrl, innerGradient])

  return (
    <div ref={wrapperRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" aria-hidden="true" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card" aria-label={`${name}, ${title}`}>
          <div className="pc-inside">
            <div className="pc-shine" aria-hidden="true" />
            <div className="pc-glare" aria-hidden="true" />
            <div className="pc-content pc-avatar-content">
              <img className="pc-avatar" src={avatarUrl} alt="" fetchPriority="high" />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img src={miniAvatarUrl || avatarUrl} alt="" />
                    </div>
                    <div className="pc-user-text">
                      <span className="pc-handle">@{handle}</span>
                      <span className="pc-status">{status}</span>
                    </div>
                  </div>
                  <button className="pc-contact-btn" onClick={onContactClick} type="button">
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div className="pc-content pc-profile-heading">
              <div className="pc-details">
                <h2>{name}</h2>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(ProfileCardComponent)
