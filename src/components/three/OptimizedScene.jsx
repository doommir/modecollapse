import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF('/assets/models/model.glb')
  return <primitive object={scene} />
}

export default function OptimizedScene() {
  return (
    <Canvas 
      camera={{ position: [0, 1, 5], fov: 45 }}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 10, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
} 