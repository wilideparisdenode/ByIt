import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {  useGLTF } from '@react-three/drei'

 export default function ComputerModel() {
  const { scene } = useGLTF('/laptop_dell_latitude_5400.glb')
  const modelRef = useRef();
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2 // Slow rotation speed
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1.2}
      position={[0, -1, 0]}
    />
  )
}