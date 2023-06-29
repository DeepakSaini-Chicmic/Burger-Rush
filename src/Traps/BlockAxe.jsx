import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import ObstacleFloor from "../Floor/ObstacleFloor";
import {
  boxGeometry,
  obstacleMaterial,
} from "../Geometry And Materials/GeometryAndMaterial";

/**
 * @description Axe Trap Block
 * @param Position positioning of the block, by default [x:0,y:0,z:0]
 * @returns Group containing Floor and RigidBody of an Obstacle - Axe Trap
 */

export default function BlockAxe({ position = [0, 0, 0] }) {
  const axe = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.cos(time + timeOffset) * 1.25;

    axe.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.8,
      z: position[2],
    });
  });
  return (
    <>
      <group position={position}>
        <ObstacleFloor />
        <RigidBody
          ref={axe}
          type="kinematicPosition"
          position={[0, 0.8, 0]}
          scale={[1.5, 1.5, 0.3]}
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
