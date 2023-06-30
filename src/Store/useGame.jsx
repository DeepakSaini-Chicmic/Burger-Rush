import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10, //Number of Obstacle Blocks to be added
      blocksSeed: 0, //For variation in blocks on game Restart or state change

      //Time
      startTime: 0, //Start Time
      endTime: 0, //End Time

      //Current state of gameplay - ready, playing or ended.
      phase: "ready",

      //Phase Change Functions

      //start game
      start: () => {
        set((state) => {
          if (state.phase === "ready")
            return { startTime: Date.now(), phase: "playing" };

          return {};
        });
      },

      //restart game
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", blocksSeed: Math.random() };

          return {};
        });
      },

      //end game
      end: () => {
        set((state) => {
          if (state.phase === "playing")
            return { endTime: Date.now(), phase: "ended" };

          return {};
        });
      },
    };
  })
);
