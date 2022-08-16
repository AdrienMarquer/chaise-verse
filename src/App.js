/* eslint-disable no-unused-vars */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import { OrbitControls, Stars, Bounds, useBounds } from '@react-three/drei'
import Planet from "./Planet"
import Chaise from "./Chaise"

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
      <OrbitControls enableZoom={false} />
      {/* <ambientLight /> */}
      <directionalLight position={[-2, 10, 10]} />
      <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
          <Suspense fallback={null}>
            <Chaise position={[0, 0, 0]} color="white"/>
            <Chaise position={[-2, 0, 0]} color="blue"/>
            <Planet position={[3, 0, 0]} />
          </Suspense>
        </SelectToZoom>
      </Bounds>
      <Stars />
    </Canvas>
  );
}

export default App;
