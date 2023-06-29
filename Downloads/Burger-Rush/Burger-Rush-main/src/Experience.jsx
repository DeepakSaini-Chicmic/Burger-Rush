import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights/Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player/Player.jsx";
import BlockSpinner from "./Traps/BlockSpinner.jsx";
import BlockAxe from "./Traps/BlockAxe.jsx";
import BlockLimbo from "./Traps/BlockLimbo.jsx";

/**
 * @description Will contain each and every component for user Experience
 * @returns
 */

export default function Experience() {
  return (
    <>
      {/* Perfromance Monitor Added */}
      <Perf position="top-left" />

      {/* Physics Added */}
      <Physics debug={false}>
        {/* Lights Component */}
        <Lights />

        {/* Level Component - containing number of obstacles and type of obstacles and floor to be added */}
        <Level count={5} types={[BlockSpinner, BlockAxe, BlockLimbo]} />

        {/* Ball or Player Component */}
        <Player />
      </Physics>
    </>
  );
}
