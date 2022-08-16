import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { TextureLoader } from "three";
import texture from "./assets/planet/grass01.jpg"

export default function Planet(props) {
  const meshRef = useRef(null);
  const colorMap = useLoader(TextureLoader, texture);
  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
  });
  return (
    <Sphere ref={meshRef} args={[1, 200, 200]} {...props}>
      {/* <meshLambertMaterial color="orange" /> */}
      <meshStandardMaterial map={colorMap} />
    </Sphere>
  );
}