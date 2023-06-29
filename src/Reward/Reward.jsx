import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
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
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        {/* Hamburger Model */}
        <primitive object={reward.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
