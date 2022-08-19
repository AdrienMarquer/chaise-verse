/* eslint-disable no-unused-vars */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import { OrbitControls, Stars, Bounds, useBounds } from '@react-three/drei'
import { Physics, Debug } from '@react-three/cannon'
import Planet from "./Planet"
import Chaise from "./Chaises"

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

export default function App() {
  return (
    <Canvas
      camera={{ position: [-2, 12, -2] }}
      dpr={[1, 2]}
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Suspense fallback={null}>
            <Physics gravity={[0, 0, 0]}>
              <Debug scale={1.02} color="black">
                <Planet />
              </Debug>
            </Physics>
          </Suspense>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.2} />
      <spotLight intensity={1.5} position={[15, 15, -20]} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight intensity={0.85} position={[-10, 15, 20]} />
    {/* <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
        </SelectToZoom>
      </Bounds> */}
      <Stars />
    </Canvas>
  );
}