import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ponytail: three.js canvas with 3 geometry modes and inertia drag. upgrade when GLTF model loading needed.
export default function About3D({ darkMode }) {
  const containerRef = useRef(null)
  const [currentMode, setCurrentMode] = useState(0) // 0: Dual Rings, 1: Icosahedron, 2: Torus Knot
  const modeNames = ['DUAL SYNERGY', 'GEODESIC CORE', 'MÖBIUS KNOT']

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 360
    const height = container.clientHeight || 360

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 4.2

    // Renderer
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)
    } catch {
      return
    }

    // Colors matching design system
    const primaryColor = darkMode ? 0x89c2ad : 0x134e4a
    const secondaryColor = darkMode ? 0xf4f0df : 0x1c1e1f
    const particleColor = darkMode ? 0x89c2ad : 0x134e4a

    // Main 3D Group
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Subgroup for current active geometry
    const meshGroup = new THREE.Group()
    mainGroup.add(meshGroup)

    // Build geometries based on mode
    const materials = []
    const geometries = []

    const buildModeGeometry = (mode) => {
      // Clear previous meshes
      while (meshGroup.children.length > 0) {
        const obj = meshGroup.children[0]
        meshGroup.remove(obj)
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      }

      if (mode === 0) {
        // Dual Interlocking Rings (Lutfi & Dimas)
        const ringGeo1 = new THREE.TorusGeometry(1.2, 0.04, 16, 70)
        const ringGeo2 = new THREE.TorusGeometry(1.2, 0.04, 16, 70)
        geometries.push(ringGeo1, ringGeo2)

        const ringMat1 = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true })
        const ringMat2 = new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true })
        materials.push(ringMat1, ringMat2)

        const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
        ring2.rotation.x = Math.PI / 2
        ring2.rotation.y = Math.PI / 4

        // Center jewel
        const centerGeo = new THREE.OctahedronGeometry(0.45, 0)
        const centerMat = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true })
        const centerMesh = new THREE.Mesh(centerGeo, centerMat)
        geometries.push(centerGeo)
        materials.push(centerMat)

        meshGroup.add(ring1, ring2, centerMesh)
      } else if (mode === 1) {
        // Geodesic Icosahedron Core
        const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
        const icoMat = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true })
        const icoMesh = new THREE.Mesh(icoGeo, icoMat)
        geometries.push(icoGeo)
        materials.push(icoMat)

        // Inner glowing core
        const innerGeo = new THREE.IcosahedronGeometry(0.7, 0)
        const innerMat = new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true })
        const innerMesh = new THREE.Mesh(innerGeo, innerMat)
        geometries.push(innerGeo)
        materials.push(innerMat)

        meshGroup.add(icoMesh, innerMesh)
      } else {
        // Möbius / Torus Knot
        const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.22, 90, 16, 2, 3)
        const knotMat = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true })
        const knotMesh = new THREE.Mesh(knotGeo, knotMat)
        geometries.push(knotGeo)
        materials.push(knotMat)

        meshGroup.add(knotMesh)
      }
    }

    buildModeGeometry(currentMode)

    // Orbital particles field
    const particleCount = 75
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.5
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.5
      particlePositions[i + 2] = (Math.random() - 0.5) * 4.5
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    })
    const particleField = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(particleField)
    geometries.push(particleGeo)
    materials.push(particleMat)

    // Interaction states
    let isDragging = false
    let previousPointerX = 0
    let previousPointerY = 0
    let targetRotationX = 0.2
    let targetRotationY = 0.2
    let rotationVelocityX = 0
    let rotationVelocityY = 0
    let mouseX = 0
    let mouseY = 0

    const onPointerDown = (e) => {
      isDragging = true
      previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0
    }

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

      // Mouse parallax tilt
      const rect = container.getBoundingClientRect()
      mouseX = ((clientX - rect.left) / rect.width - 0.5) * 0.8
      mouseY = ((clientY - rect.top) / rect.height - 0.5) * 0.8

      if (!isDragging) return

      const deltaX = clientX - previousPointerX
      const deltaY = clientY - previousPointerY

      rotationVelocityY = deltaX * 0.007
      rotationVelocityX = deltaY * 0.007

      targetRotationY += rotationVelocityY
      targetRotationX += rotationVelocityX

      previousPointerX = clientX
      previousPointerY = clientY
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const domEl = renderer.domElement
    domEl.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // Resize handler
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animId
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Idle auto-rotation + inertia
      if (!isDragging) {
        targetRotationY += 0.006
        targetRotationX += 0.002
        rotationVelocityX *= 0.94
        rotationVelocityY *= 0.94
        targetRotationX += rotationVelocityX
        targetRotationY += rotationVelocityY
      }

      // Smooth interpolation (lerp)
      mainGroup.rotation.y += (targetRotationY + mouseX * 0.5 - mainGroup.rotation.y) * 0.06
      mainGroup.rotation.x += (targetRotationX + mouseY * 0.5 - mainGroup.rotation.x) * 0.06

      // Counter-rotate particles subtly
      particleField.rotation.y -= delta * 0.08

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      domEl.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [currentMode, darkMode])

  const nextMode = () => {
    setCurrentMode((prev) => (prev + 1) % 3)
  }

  return (
    <div className="about-3d-card" aria-label="Interactive 3D Duo Core Visualization">
      <div className="about-3d-header">
        <div className="about-3d-title">
          <span className="about-3d-dot" aria-hidden="true" />
          <span>DUO CORE / 3D SCULPTURE</span>
        </div>
        <span className="about-3d-mode-label">{modeNames[currentMode]}</span>
      </div>

      <div
        ref={containerRef}
        className="about-3d-canvas-wrap"
        title="Click and drag to spin 3D sculpture"
      />

      <div className="about-3d-footer">
        <span className="about-3d-hint">CLICK & DRAG TO ROTATE · 360°</span>
        <button
          type="button"
          onClick={nextMode}
          className="about-3d-switch-btn"
          aria-label="Switch 3D Geometry Mode"
        >
          CYCLE FORM ↗
        </button>
      </div>
    </div>
  )
}
