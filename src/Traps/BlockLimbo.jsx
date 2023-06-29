import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import ObstacleFloor from "../Floor/ObstacleFloor";
import {
  boxGeometry,
  obstacleMaterial,
} from "../Geometry And Materials/GeometryAndMaterial";

/**
 * @description Limbo Trap Block
 * @param Position positioning of the block, by default [x:0,y:0,z:0]
 * @returns Group containing Floor and RigidBody of an Obstacle - Limbo Trap
 */

export default function BlockLimbo({ position = [0, 0, 0] }) {
  const limbo = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.15;

    limbo.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });
  return (
    <>
      <group position={position}>
        <ObstacleFloor />
        <RigidBody
          type="kinematicPosition"
          ref={limbo}
          position={[0, 0.3, 0]}
          scale={[3.5, 0.3, 0.3]}
          friction={0}
          restitution={0.2}
        >
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}
