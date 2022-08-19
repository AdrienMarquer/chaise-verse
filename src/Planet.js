/* eslint-disable no-unused-vars */
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { TextureLoader } from "three";
import texture from "./assets/planet/grass01.jpg"
import { mergeRefs } from "react-merge-refs";
import { useSphere } from '@react-three/cannon'
import Chaises from "./Chaises";

export const groundMaterial = "ground";

export default function Planet(props) {
  const radius = 6.5;
  // const colorMap = useLoader(TextureLoader, texture);

  const worldRef = useRef();
  const [physicsRef] = useSphere(() => ({ args: [radius], type: "kinematic", material: groundMaterial }));

  // useFrame(() => {
  //   if (!meshRef.current) {
  //     return;
  //   }

  //   meshRef.current.rotation.x += 0.001;
  //   meshRef.current.rotation.y += 0.001;
  // });
  return (
    <group {...props}>
      <Sphere
        ref={mergeRefs([worldRef, physicsRef])}
        args={[radius, 32, 32]}
        position={[0, 0, 0]}
        receiveShadow
        castShadow>
        <meshStandardMaterial color="#32194c" />
        {/* <meshStandardMaterial map={colorMap} /> */}
      </Sphere>
      <Chaises mesh={worldRef}/>
    </group>
  );
}