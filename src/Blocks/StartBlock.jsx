import { Float, Text } from "@react-three/drei";
import NormalFloor from "../Floor/NormalFloor";

/**
 * @description Normal Floor (Contains NO Obstacle)
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing RigidBody of a mesh with floor Geometry and floor Material 1
 */
export default function StartBlock({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          scale={0.5}
          position={[0.75, 0.65, 0]}
          font="./bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          rotation-y={-0.25}
        >
          Burger Rush
          <meshBasicMaterial color={"#ffffff"} />
        </Text>
      </Float>
      <NormalFloor position={[0, 0, 0]} />
    </group>
  );
}
