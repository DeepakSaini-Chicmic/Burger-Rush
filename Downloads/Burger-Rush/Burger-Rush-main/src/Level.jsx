import { useMemo } from "react";
import BlockSpinner from "./Traps/BlockSpinner";
import BlockAxe from "./Traps/BlockAxe";
import BlockLimbo from "./Traps/BlockLimbo";
import Walls from "./Walls/Walls";
import NormalFloor from "./Floor/NormalFloor";
import Reward from "./Reward/Reward";

/**
 * @description One Level of the Game
 * @param Count - Number of Obstacle Blocks, by default - 5
 * @param Types - Type of Obstacles in the Level, by default - BlockSpinner, BlockAxe, BlockLimbo
 * @returns Walls, Starting Floor, Traps and Rewards
 */

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);

  return (
    <>
      <Walls length={count + 2} />
      <NormalFloor position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <Reward position={[0, 0, -(count + 1) * 4]} />
    </>
  );
}
