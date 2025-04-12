import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

function Portal({ onClick }) {
  const portalRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)
  
  // Handle hover animation
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  
  // Animate the scale
  useFrame(() => {
    if (portalRef.current) {
      portalRef.current.rotation.y += 0.005
      
      // Smooth scale animation
      if (hovered && scale < 1.2) {
        setScale(prev => Math.min(prev + 0.02, 1.2))
      } else if (!hovered && scale > 1) {
        setScale(prev => Math.max(prev - 0.02, 1))
      }
      
      portalRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      <mesh
        ref={portalRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <torusGeometry args={[1.5, 0.4, 32, 100]} />
        <meshStandardMaterial 
          color={hovered ? '#8b5cf6' : '#6366f1'} 
          roughness={0.3} 
          metalness={0.7} 
          emissive={hovered ? '#6200ea' : '#3d5afe'}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

function FloatingText({ position }) {
  const textRef = useRef()
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group ref={textRef}>
      <Text position={position} fontSize={0.3} color="#fff" anchorX="center" anchorY="middle">
        Click the Portal
      </Text>
    </group>
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
      <FloatingText position={[0, -2, 0]} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  )
} 