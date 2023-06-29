import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights/Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player/Player.jsx";
import BlockSpinner from "./Traps/BlockSpinner.jsx";
import BlockAxe from "./Traps/BlockAxe.jsx";
import BlockLimbo from "./Traps/BlockLimbo.jsx";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <Physics debug={false}>
        <Lights />
        <Level count={5} types={[BlockSpinner, BlockAxe, BlockLimbo]} />
        <Player />
      </Physics>
    </>
  );
}
