import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { BlockSpinner, BlockAxe, BlockLimbo } from "./Level.jsx";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Physics>
        <Lights />
        <Level count={5} types={[BlockSpinner, BlockAxe, BlockLimbo]} />
      </Physics>
    </>
  );
}
