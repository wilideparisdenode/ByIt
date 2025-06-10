import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE for type assertions

export default function ComputerModel() {
  const { scene } = useGLTF('/gaming_desktop_pc_blend_file.glb');
  const modelRef = useRef<THREE.Object3D>(null); // Initialize with null
  
  useFrame((_, delta) => { // Removed unused state
    if (modelRef.current) {
      (modelRef.current as THREE.Object3D).rotation.y += delta * 0.2; // Type assertion
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={0.5}
      position={[0, -2.1, 0]}
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
}