import { RigidBody } from "@react-three/rapier";
import { Text, useGLTF } from "@react-three/drei";
import NormalFloor from "../Floor/NormalFloor";

/**
 * @description End Block of the Game
 * @param position Positioning the block
 * @returns Group containing the Normal floor and the hamburger Model
 */
export default function Reward({ position = [0, 0, 0] }) {
  //Model Loaded
  const reward = useGLTF("./hamburger.glb");
  //Allowing every mesh to cast shadow
  reward.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      <NormalFloor />
      <Text
        scale={1}
        font="bebas-neue-v9-latin-regular.woff"
        position={[0, 2.25, -1]}
      >
        FINISH
        <meshBasicMaterial color={"#ffffff"} />
      </Text>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        {/* Hamburger Model Added in the scene */}
        <primitive object={reward.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
