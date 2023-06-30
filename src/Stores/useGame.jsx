import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,
      //Time
      startTime: 0,
      endTime: 0,

      //Phase
      phase: "ready",

      //Phase Change Functions
      start: () => {
        set((state) => {
          if (state.phase === "ready")
            return { startTime: Date.now(), phase: "playing" };

          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", blocksSeed: Math.random() };

          return {};
        });
      },
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
