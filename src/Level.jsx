import { useMemo } from "react";
import BlockSpinner from "./Blocks/BlockSpinner";
import BlockAxe from "./Blocks/BlockAxe";
import BlockLimbo from "./Blocks/BlockLimbo";
import Walls from "./Walls/Walls";
import Reward from "./Blocks/EndBlock";
import StartBlock from "./Blocks/StartBlock";
/**
 * @description One Level of the Game
 * @param Count - Number of Obstacle Blocks, by default - 5
 * @param Types - Type of Obstacles in the Level, by default - BlockSpinner, BlockAxe, BlockLimbo
 * @returns Walls, Starting Floor, Traps and Rewards
 */

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <Walls length={count + 2} />
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <Reward position={[0, 0, -(count + 1) * 4]} />
    </>
  );
}
