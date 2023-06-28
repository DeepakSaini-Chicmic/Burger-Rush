import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

/**
 * @description Starting Block of the Game
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing RigidBody of a mesh with floor Geometry and floor Material 1
 */
export function BlockStart({ position = [0, 0, 0] }) {
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

/**
 * @description Obstacle Block
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing RigidBody of a mesh with floor Geometry and floor Material 2
 */

export function ObstacleFloor({ position = [0, 0, 0] }) {
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

/**
 * @description Spinner Obstacle Block
 * @param Position positioning of the block, by default [x:0, y:0, z:0]
 * @returns Group containing Floor and RigidBody of a Obstacle - Spinner
 */

export function BlockSpinner({ position = [0, 0, 0] }) {
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
    spinner.current.setNextKinematicRotation(quaternionRotation); //setNextKinematicRotation - used for rotating the obstacle on each next frame
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

/**
 * @description Starting Block of the Game
 * @param Position positioning of the block, by default [x:0,y:0,z:0]
 * @returns Group containing Floor and RigidBody of an Obstacle - Limbo Trap
 */

export function BlockLimbo({ position = [0, 0, 0] }) {
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

export function BlockAxe({ position = [0, 0, 0] }) {
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

export function BlockEnd({ position = [0, 0, 0] }) {
  const reward = useGLTF("./hamburger.glb");
  reward.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      <RigidBody type="fixed" restitution={0.2} friction={1}>
        <mesh
          position={[0, -0.1, 0]}
          geometry={boxGeometry}
          material={floor1Material}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={reward.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Walls({ length }) {
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

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      console.log(type);
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);

  console.log(blocks);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Walls length={count + 2} />
    </>
  );
}
