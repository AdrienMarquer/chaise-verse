/* eslint-disable no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: CGHUGGE (https://sketchfab.com/CGHUGGE)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/ikea-poang-rocking-chair-f74c8e97e8514d8fac6b4860272b1a76
title: IKEA_poang-rocking-chair
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'
import { Sampler } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

// export default function Model( props ) {
//   const { nodes, materials } = useGLTF('/chaise.gltf')
//   const color = props.color
//   const [ref, api] = useBox(() => ({ mass: 1, ...props }))

//   return (
//     <group {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]} scale={0.04}>
//         <group rotation={[Math.PI / 2, 0, 0]}>
//           <group position={[12.21, -7.51, 1.73]} rotation={[-1.63, 0, Math.PI]} scale={0.04}>
//             <mesh geometry={nodes['Rectangle002_Material_#1_0'].geometry} material={materials.Material_1}>
//               <meshLambertMaterial color={color} />
//             </mesh>
//             <mesh geometry={nodes.Rectangle002_default_0.geometry} material={materials['default']} >
//             <meshLambertMaterial color={color} />
//             </mesh>
//           </group>
//           <group position={[-0.2, 1.97, -10.25]} rotation={[-0.21, Math.PI / 2, 0]} scale={0.04}>
//             <mesh geometry={nodes['Rectangle005_Material_#2_0'].geometry} material={materials.Material_2} >
//             <meshLambertMaterial color={color} />
//             </mesh>
//             <mesh geometry={nodes['Rectangle005_Material_#2_0_1'].geometry} material={materials.Material_2} >
//             <meshLambertMaterial color={color} />
//             </mesh>
//           </group>
//         </group>
//       </group>
//     </group>
//     // <mesh ref={ref} >
//     //     <boxGeometry args={[1, 1, 1]} />
//     //     <meshNormalMaterial />
//     //   </mesh>
//   )
// }

export function ChaisePhysics({ innerRef, args }) {
  const [dummy] = useState(() => ({
    matrix: new THREE.Matrix4(),
    pos: new THREE.Vector3(),
    quat: new THREE.Quaternion(),
    scale: new THREE.Vector3(),
    euler: new THREE.Euler()
  }));

  useBox((i) => {
    innerRef.current.getMatrixAt(i, dummy.matrix);
    dummy.matrix.decompose(dummy.pos, dummy.quat, dummy.scale);
    dummy.euler.setFromQuaternion(dummy.quat);

    return { args, position: [...dummy.pos], rotation: [dummy.euler.x, dummy.euler.y, dummy.euler.z], type: "static" };
  }, innerRef);

  return null;
}

export default function Chaises({ meshRef = null, count = 50 }) {
  // const { nodes, materials } = useGLTF('/chaise.gltf')
  // const color = 'white'

  const instances = useRef();
  const args = [0.6, 0.6, 0.6];
  const [physics, setPhsyics] = useState(false);

  useEffect(() => {
    setPhsyics(true);
  }, []);

  return (
    <>
      <mesh>
        <instancedMesh ref={instances} args={[null, null, count]} receiveShadow castShadow>
          <boxBufferGeometry args={args} />
          <meshLambertMaterial color="red" />
        </instancedMesh>
      </mesh>
      <Sampler
        mesh={meshRef}
        instances={instances}
        transform={({ dummy, position, normal, sampledMesh }, i) => {
          const worldPosition = sampledMesh.localToWorld(position);
          dummy.position.copy(worldPosition);
          dummy.lookAt(normal.clone().add(position));
          dummy.scale.set(0.6, 0.6, 0.6);
        }}
      />
      {physics && <ChaisePhysics innerRef={instances} args={args} />}
    </>
  );
}


// useGLTF.preload('/chaise.gltf')
