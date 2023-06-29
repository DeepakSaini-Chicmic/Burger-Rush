import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";

export default function Player() {
  const ball = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world;

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());

  const jump = (value) => {
    const origin = ball.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    if (hit.toi < 0.15) {
      ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump(value);
      }
    );
    return () => {
      unsubscribeJump();
    };
  }, []);

  useFrame((state, delta) => {
    // Keyboard Controls
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    ball.current.applyImpulse(impulse);
    ball.current.applyTorqueImpulse(torque);

    //Camera
    let ballPosition = ball.current.translation();

    //Storing the position where camera need to be placed
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    //Storing the position where the camera would see or target
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.65;

    smoothCameraPosition.lerp(cameraPosition, delta * 5);
    smoothCameraTarget.lerp(cameraTarget, delta * 5);
    //setting camera Position and looking position
    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);
    // state.camera.lookAt({ ballPosition });
  });
  return (
    <>
      <RigidBody
        ref={ball}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 0.3, 0]}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color={"mediumpurple"} />
        </mesh>
      </RigidBody>
    </>
  );
}
