// import { RigidBody } from "@react-three/rapier";
// import {
//   boxGeometry,
//   floor2Material,
//   obstacleMaterial,
// } from "../Geometry And Materials/GeometryAndMaterial";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

// export default function BlockDoor({ position = [0, 0, 0] }) {
//   const leftdoor = useRef();
//   const rightDoor = useRef();
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     console.log(leftdoor.current);
//     const x1 = Math.cos(time);
//     const x2 = -Math.cos(time);
//     leftdoor.current.setNextKinematicTranslation({
//       x: position[0] + x1 + 1,
//       y: position[1],
//       z: position[2],
//     });
//     rightDoor.current.setNextKinematicTranslation({
//       x: (position[0] + x2),
//       y: position[1],
//       z: position[2],
//     });
//   });
//   return (
//     <group position={position}>
//       <RigidBody type="fixed">
//         <mesh
//           geometry={boxGeometry}
//           material={floor2Material}
//           scale={[4, 0.2, 4]}
//           position={[0, -0.1, 0]}
//         />
//       </RigidBody>
//       <RigidBody ref={leftdoor} type="kinematicPosition">
//         <mesh
//           geometry={boxGeometry}
//           material={obstacleMaterial}
//           position={[-1.5, 1, 0]}
//           scale={[1, 2, 0.2]}
//         />
//       </RigidBody>
//       <RigidBody type="kinematicPosition" ref={rightDoor}>
//         <mesh
//           geometry={boxGeometry}
//           material={obstacleMaterial}
//           position={[1.5, 1, 0]}
//           scale={[1, 2, 0.2]}
//         />
//       </RigidBody>
//     </group>
//   );
// }
