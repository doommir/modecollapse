import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Text } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

function Portal({ onClick }) {
  const portalRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    portalRef.current.rotation.y += 0.005
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5}>
      <motion.mesh
        ref={portalRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <torusGeometry args={[1.5, 0.4, 32, 100]} />
        <meshStandardMaterial color={hovered ? '#8b5cf6' : '#6366f1'} roughness={0.3} metalness={0.7} />
      </motion.mesh>
    </Float>
  )
}

function InstructionText({ position }) {
  return (
    <Text position={position} fontSize={0.3} color="#fff" anchorX="center" anchorY="middle">
      Click the Portal
    </Text>
  )
}

export default function InteractivePortal() {
  const handleClick = () => {
    alert('Portal clicked! Here is where your AI interaction begins...')
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={['#111827']} />
      <ambientLight intensity={0.4} />
      <directionalLight intensity={1} position={[5, 10, 7]} />
      <Portal onClick={handleClick} />
      <InstructionText position={[0, -2, 0]} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  )
} 