import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import ObstacleFloor from "../Floor/ObstacleFloor";
import {
  boxGeometry,
  obstacleMaterial,
} from "../Geometry And Materials/GeometryAndMaterial";

/**
 * @description Spinner Obstacle Block
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing Floor and RigidBody of a Obstacle - Spinner
 */

export default function BlockSpinner({ position = [0, 0, 0] }) {
  //Used as a reference of the rigidbody
  const spinner = useRef();
  //Speed variable used for varying the speed of the obstacle spin and in random direction
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  // useFrame used updating the rotation on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime(); //Elapsed time
    const eulerRotation = new THREE.Euler(0, time * speed, 0); //Euler Rotation angle in x, y and z
    const quaternionRotation = new THREE.Quaternion(); //Quaternion Rotation angle
    quaternionRotation.setFromEuler(eulerRotation); // setting the Quaternion angle from Euler angle
    spinner.current.setNextKinematicRotation(quaternionRotation); //setNextKinematicRotation - used for rotating the rigid body
  });
  return (
    <>
      <group position={position}>
        <ObstacleFloor />
        <RigidBody
          type="kinematicPosition" //kinematicPosition - means position will only change when any force or impulse is applied and not by the rigidbodies
          ref={spinner}
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
