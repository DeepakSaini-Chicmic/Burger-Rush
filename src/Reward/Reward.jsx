import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import NormalFloor from "../Floor/NormalFloor";

export default function Reward({ position = [0, 0, 0] }) {
  const reward = useGLTF("./hamburger.glb");
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
        <primitive object={reward.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
