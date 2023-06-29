import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * @description Adds Directional Light and ambient Light
 * @returns fragment containing directional light and ambient light following the player on movement
 */

export default function Lights() {
  const lights = useRef(); //Reference of the directional light
  useFrame((state) => {
    // For updating the position of the directional light on every frame following the player
    lights.current.position.z = state.camera.position.z + 1 - 4;
    lights.current.target.position.z = state.camera.position.z - 4;

    //updating the target's matrix as its still focusing on [0,0,0]
    lights.current.target.updateMatrixWorld();
  });
  return (
    <>
      <directionalLight
        ref={lights}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
