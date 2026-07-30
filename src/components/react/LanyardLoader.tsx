import { lazy, Suspense, useEffect, useState } from 'react'
import type { LanyardProps } from './Lanyard'

const Lanyard = lazy(() => import('./Lanyard'))

export default function LanyardLoader (props: LanyardProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = globalThis.setTimeout(() => setReady(true), 250)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return (
    <Suspense fallback={null}>
      {ready && <Lanyard {...props} />}
    </Suspense>
  )
}
