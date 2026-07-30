import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, type RapierRigidBody } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import './Lanyard.css'

const CARD_GLB_URL = '/assets/lanyard/card.glb'
const LANYARD_TEXTURE_URL = '/assets/lanyard/lanyard.png'

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

// card.glb UV atlas: front face = left half, back face = right half.
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 }

extend({ MeshLineGeometry, MeshLineMaterial })

interface CardGLTFResult {
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
  }
}

export interface LanyardProps {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
  frontUsername?: string | null
  backUsername?: string | null
  anchorX?: number
  anchorY?: number
}

export default function Lanyard ({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  frontUsername = null,
  backUsername = null,
  anchorX = 0,
  anchorY = 4
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            frontUsername={frontUsername}
            backUsername={backUsername}
            anchorX={isMobile ? 0 : anchorX}
            anchorY={anchorY}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

interface BandProps {
  maxSpeed?: number
  minSpeed?: number
  isMobile?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
  frontUsername?: string | null
  backUsername?: string | null
  anchorX?: number
  anchorY?: number
}

function Band ({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  frontUsername = null,
  backUsername = null,
  anchorX = 0,
  anchorY = 4
}: BandProps) {
  const band = useRef<THREE.Mesh>(null!)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<RapierRigidBody>(null!)
  const j2 = useRef<RapierRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)
  const cardMesh = useRef<THREE.Mesh>(null!)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const { camera, gl } = useThree()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const pointerNDC = useRef(new THREE.Vector2())
  const dragOffset = useRef<THREE.Vector3 | null>(null)

  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 }
  const { nodes, materials } = useGLTF(CARD_GLB_URL) as unknown as CardGLTFResult
  const texture = useTexture(lanyardImage || LANYARD_TEXTURE_URL)
  const frontTex = useTexture(frontImage || BLANK_PIXEL)
  const backTex = useTexture(backImage || BLANK_PIXEL)

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture
    if (!frontImage && !backImage) return baseMap

    const baseImg = baseMap.image as HTMLImageElement
    const W = baseImg.width
    const H = baseImg.height
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap
    ctx.drawImage(baseImg, 0, 0, W, H)

    const fillFaceBackground = (rect: { x: number; y: number; w: number; h: number }) => {
      const rx = rect.x * W
      const ry = rect.y * H
      const rw = rect.w * W
      const rh = rect.h * H
      const glow = ctx.createLinearGradient(rx, ry, rx + rw * 0.3, ry + rh)
      glow.addColorStop(0, '#bae6fd')
      glow.addColorStop(0.5, '#e0f2fe')
      glow.addColorStop(1, '#f8fafc')
      ctx.fillStyle = glow
      ctx.fillRect(rx, ry, rw, rh)

      const band = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh)
      band.addColorStop(0, 'rgba(2, 132, 199, 0.16)')
      band.addColorStop(0.5, 'rgba(56, 189, 248, 0)')
      band.addColorStop(1, 'rgba(3, 105, 161, 0.14)')
      ctx.fillStyle = band
      ctx.fillRect(rx, ry, rw, rh)

      ctx.strokeStyle = 'rgba(3, 105, 161, 0.25)'
      ctx.lineWidth = Math.max(1, rw * 0.006)
      ctx.strokeRect(rx + ctx.lineWidth / 2, ry + ctx.lineWidth / 2, rw - ctx.lineWidth, rh - ctx.lineWidth)
      return { rx, ry, rw, rh }
    }

    const drawFace = (
      img: HTMLImageElement,
      rect: { x: number; y: number; w: number; h: number },
      username: string | null,
      fillWidth = false
    ) => {
      const { rx, ry, rw, rh } = fillFaceBackground(rect)
      const padX = rw * 0.16
      // Extra top padding compensates for the clip/grommet hardware above the panel.
      const padTop = rh * 0.22
      const padBottom = rh * 0.12
      const innerX = rx + padX
      const innerY = ry + padTop
      const innerW = rw - padX * 2
      const innerH = rh - padTop - padBottom

      const imgH = username ? innerH * (fillWidth ? 0.74 : 0.58) : innerH
      const pick = imageFit === 'contain' ? Math.min : Math.max
      const scale = fillWidth ? innerW / img.width : pick(innerW / img.width, imgH / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      const dx = innerX + (innerW - dw) / 2
      const dy = fillWidth ? innerY + (imgH - dh) / 2 : innerY + (imgH - dh) * 0.85
      ctx.save()
      ctx.beginPath()
      ctx.rect(innerX, innerY, innerW, imgH)
      ctx.clip()
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()

      if (username) {
        const dividerY = innerY + imgH + innerH * 0.04
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.25)'
        ctx.lineWidth = Math.max(1, rw * 0.004)
        ctx.beginPath()
        ctx.moveTo(innerX + innerW * 0.2, dividerY)
        ctx.lineTo(innerX + innerW * 0.8, dividerY)
        ctx.stroke()

        let fontSize = Math.round(innerW * 0.22)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        do {
          ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`
          fontSize -= 1
        } while (ctx.measureText(username).width > innerW * 0.9 && fontSize > 8)

        ctx.fillStyle = '#0369a1'
        ctx.fillText(username, innerX + innerW / 2, dividerY + innerH * 0.05)
      }
    }

    if (frontImage && frontTex.image) drawFace(frontTex.image as HTMLImageElement, FRONT_UV_RECT, frontUsername)
    if (backImage && backTex.image) drawFace(backTex.image as HTMLImageElement, BACK_UV_RECT, backUsername)

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true
    return composite
  }, [frontImage, backImage, imageFit, frontUsername, backUsername, frontTex, backTex, materials.base.map])

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  )
  const [dragging, setDragging] = useState(false)
  // Rope segments spawn pre-staggered and take a few frames to drape naturally;
  // stay hidden until settled to avoid a disconnected-looking flash on load.
  const [ready, setReady] = useState(false)
  const readyFrame = useRef(0)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ])

  useEffect(() => {
    const el = gl.domElement

    const setNDC = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
    }
    const hitCard = () => {
      if (!cardMesh.current) return undefined
      raycaster.setFromCamera(pointerNDC.current, camera)
      return raycaster.intersectObject(cardMesh.current, true)[0]
    }

    const onDown = (e: PointerEvent) => {
      setNDC(e)
      const hit = hitCard()
      if (!hit || !card.current) return
      e.preventDefault()
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      dragOffset.current = new THREE.Vector3().copy(hit.point).sub(vec.copy(card.current.translation()))
      setDragging(true)
      document.body.style.cursor = 'grabbing'
      document.body.style.touchAction = 'none'
      document.body.style.userSelect = 'none'
    }
    const onMove = (e: PointerEvent) => {
      if (dragOffset.current) {
        e.preventDefault()
        setNDC(e)
        return
      }
      setNDC(e)
      document.body.style.cursor = hitCard() ? 'grab' : 'auto'
    }
    const onUp = () => {
      if (!dragOffset.current) return
      dragOffset.current = null
      setDragging(false)
      document.body.style.cursor = 'auto'
      document.body.style.touchAction = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('pointerdown', onDown, { passive: false })
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.style.cursor = 'auto'
      document.body.style.touchAction = ''
      document.body.style.userSelect = ''
    }
  }, [camera, gl, raycaster])

  useFrame((state, delta) => {
    if (!ready) {
      readyFrame.current += 1
      if (readyFrame.current > 20) setReady(true)
    }
    if (dragOffset.current) {
      vec.set(pointerNDC.current.x, pointerNDC.current.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragOffset.current.x,
        y: vec.y - dragOffset.current.y,
        z: vec.z - dragOffset.current.z
      })
    }
    if (fixed.current) {
      type LerpedRef = RapierRigidBody & { lerped?: THREE.Vector3 }
      ;[j1, j2].forEach((ref) => {
        const current = ref.current as LerpedRef
        if (!current.lerped) current.lerped = new THREE.Vector3().copy(current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, current.lerped.distanceTo(current.translation())))
        current.lerped.lerp(current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy((j2.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped)
      curve.points[2].copy((j1.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped)
      curve.points[3].copy(fixed.current.translation())
      ;(band.current.geometry as unknown as MeshLineGeometry).setPoints(curve.getPoints(isMobile ? 16 : 32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[anchorX, anchorY, 0]} visible={ready}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragging ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={2.25} position={[0, -1.2, -0.05]}>
            <mesh ref={cardMesh} geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} visible={ready}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          transparent
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  )
}

useGLTF.preload(CARD_GLB_URL)
