import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights/Lights.jsx";
import Level from "./Level.jsx";
import Player from "./Player/Player.jsx";
import BlockSpinner from "./Blocks/BlockSpinner.jsx";
import BlockAxe from "./Blocks/BlockAxe.jsx";
import BlockLimbo from "./Blocks/BlockLimbo.jsx";
import useGame from "./Store/useGame.jsx";
import { OrbitControls } from "@react-three/drei";
/**
 * @description Will contain each and every component for user Experience
 * @returns whole user experience containing the performance monitor, color of scene, Physics World containing lights, level and player component.
 */

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount); // fetching the number of obstacle blocks count
  const blocksSeed = useGame((state) => state.blocksSeed); // fetching blockSeed Variation to randomly shuffle the obstacles
  return (
    <>
      {/* Perfromance Monitor Added */}
      <Perf position="top-left" />
      {/* <OrbitControls /> */}
      {/* Added Color to the Background */}
      <color args={["#bdedfc"]} attach={"background"} />
      {/* Physics Added */}
      <Physics debug={false}>
        {/* Lights Component */}
        <Lights />

        {/* Level Component - containing number of obstacles and type of obstacles and floor to be added */}
        <Level
          count={blocksCount}
          types={[BlockSpinner, BlockAxe, BlockLimbo]}
          seed={blocksSeed}
        />

        {/* Ball or Player Component */}
        <Player />
      </Physics>
    </>
  );
}
