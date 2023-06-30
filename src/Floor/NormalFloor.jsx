import { RigidBody } from "@react-three/rapier";
import {
  boxGeometry,
  floor1Material,
} from "../Geometry And Materials/GeometryAndMaterial";
import { Float, Text } from "@react-three/drei";

/**
 * @description Normal Floor (Contains NO Obstacle)
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing RigidBody of a mesh with floor Geometry and floor Material 1
 */
export default function NormalFloor({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" friction={1} restitution={0.2}>
        <mesh
          position={[0, -0.1, 0]}
          geometry={boxGeometry}
          material={floor1Material}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
