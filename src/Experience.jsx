import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player.jsx";
import BlockSpinner from "./Traps/BlockSpinner.jsx";
import BlockAxe from "./Traps/BlockAxe.jsx";
import BlockLimbo from "./Traps/BlockLimbo.jsx";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level count={10} types={[BlockSpinner, BlockAxe, BlockLimbo]} />
        <Player />
      </Physics>
    </>
  );
}
