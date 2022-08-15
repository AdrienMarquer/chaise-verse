/* eslint-disable no-unused-vars */
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { OrbitControls, Stars, Bounds, useBounds } from '@react-three/drei'

function Planete(props) {
  const meshRef = useRef(null);
  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry />
      <meshPhongMaterial color="white" />
    </mesh>
  );
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
// eslint-disable-next-line react/prop-types
function SelectToZoom({ children }) {
  const api = useBounds()
  return (
    <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
    </group>
  )
}

function App() {
  return (
    <Canvas
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <OrbitControls />
      <ambientLight />
      <spotLight position={[10, 15, 10]} angle={0.3}/>
      <pointLight position={[10, 10, 10]} />
        <Bounds fit clip observe margin={1.2}>
          <SelectToZoom>
            <Planete position={[-1.2, 0, 0]} />
            <Planete position={[1.2, 0, 0]} />
          </SelectToZoom>
        </Bounds>
        <Stars />
    </Canvas>
  );
}

export default App;
