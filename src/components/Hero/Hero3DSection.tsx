import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ComputerModel from './ComputerModel';
// import { Environment } from '@react-three/drei';
import "./hero.css"

export default function Hero() {
  return (
    <section className="hero-section">
           
      <div className="hero-3d-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
        {/* <Environment preset="dawn" background /> */}

          {/* <ambientLight intensity={0} /> */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          {/* <pointLight position={[-10, -10, -10]} /> */}
          <directionalLight position={[10,10,10]} intensity={1} />
          <ComputerModel />
          <OrbitControls 
            enableZoom={false}
            enablePan={true}
            enableRotate={false}
          />
        </Canvas>
      </div>
      <div className="hero-content">
        <h1>Our 3D Product Showcase</h1>
        <p>Quality product for Elite Clients</p>
        <button className='shop_now' type="button">Get started</button>
      </div>
    </section>
  )
}

