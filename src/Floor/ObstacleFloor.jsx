import { RigidBody } from "@react-three/rapier";
import {
  boxGeometry,
  floor2Material,
} from "../Geometry And Materials/GeometryAndMaterial";

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
