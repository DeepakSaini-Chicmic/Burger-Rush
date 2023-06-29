import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
/**
 * @description Player Movement and Camera Movement Following
 * @returns
 */
export default function Player() {
  const ball = useRef(); //Reference of Ball
  const [subscribeKeys, getKeys] = useKeyboardControls(); //Uses the controls stored in the KeyboardControls Helper of DREI
  const { rapier, world } = useRapier(); //Rapier used for casting ray below the ball for knowing distance between the ground and ball
  const rapierWorld = world;

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10)); //For Smooth Camera Position
  const [smoothCameraTarget] = useState(() => new THREE.Vector3()); //For Smooth Camera Target

  const jump = (value) => {
    const origin = ball.current.translation(); //Storing the position of ball as origin to cast the ray
    origin.y -= 0.31; // Shifting the Ball origin down as ray is casted from center of the ball
    const direction = { x: 0, y: -1, z: 0 }; //Direction of the Ray Cast
    const ray = new rapier.Ray(origin, direction); //ray casted
    //checking if the ray hit any rigid body till the distance 10, true represents that rigid bodies contains matter
    const hit = rapierWorld.castRay(ray, 10, true);
    //Time of impact check condition
    if (hit.toi < 0.15) {
      ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 }); //Applying impulse if toi is lesser than 0.15
    }
  };

  //Used for registering the events on the first render of the component and wont register again if component is re-rendered again.
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump, //Checks for state change on button press and calls the next function
      (value) => {
        //On previous state change, this function is called
        if (value) jump(value);
      }
    );
    return () => {
      unsubscribeJump();
      //returns this function so that the state change and
      //function call is triggered only one time for keyDown
      //and not for keyUP.
    };
  }, []);

  //Called on  each frame
  useFrame((state, delta) => {
    // Keyboard Controls
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 }; // initial impulse
    const torque = { x: 0, y: 0, z: 0 }; // initial torque
    const impulseStrength = 0.6 * delta; // strength of impulse applied
    const torqueStrength = 0.2 * delta; // strength of torque applied

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
    let ballPosition = ball.current.translation(); //Storing Ball Position on each frame

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
