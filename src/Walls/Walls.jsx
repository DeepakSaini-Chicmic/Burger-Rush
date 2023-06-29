import { RigidBody } from "@react-three/rapier";
import {
  boxGeometry,
  wallMaterial,
} from "../Geometry And Materials/GeometryAndMaterial";

export default function Walls({ length }) {
  const thickness = 0.3;
  const height = 1.5;

  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2 + thickness, height, -(length * 2) + 2]}
          scale={[thickness * 2, height * 2, length * 4]}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-(2 + thickness), height, -(length * 2) + 2]}
          scale={[thickness * 2, height * 2, length * 4]}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, height, 2 + thickness]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[thickness * 2, height * 2, 4]}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, height, -(2 + thickness) - (length - 1) * 4]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[thickness * 2, height * 2, 4]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </>
  );
}
