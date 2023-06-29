import { RigidBody } from "@react-three/rapier";
import {
  boxGeometry,
  floor2Material,
} from "../Geometry And Materials/GeometryAndMaterial";

/**
 * @description Obstacle Floor (Contains Obstacle)
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing RigidBody of a mesh with floor Geometry and floor Material 2
 */

export default function ObstacleFloor({ position = [0, 0, 0] }) {
  return (
    <>
      <group position={position}>
        <RigidBody
          type="fixed" //Position will remain fixed and won't change dynamically
          position={position}
          restitution={0.2}
          friction={1}
        >
          <mesh
            position={[0, -0.1, 0]}
            geometry={boxGeometry}
            material={floor2Material}
            scale={[4, 0.2, 4]}
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}
