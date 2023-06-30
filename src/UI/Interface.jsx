import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../Stores/useGame";

/**
 * @description 2D User Interface
 * @returns div's containing timer, Restart button and the button states
 */

export default function Interface() {
  // Fetching the Keyboard Inputs Stored in KeyboardControls Helper of DREI
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  const reset = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const time = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase == "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase == "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      if (time.current) time.current.textContent = elapsedTime;
    });
    return () => unsubscribeEffect();
  }, []);
  return (
    <div className="interface">
      <center>
        <div className="time" ref={time}>
          0:00
        </div>
        {phase === "ended" ? (
          <div className={"restart"} onClick={reset}>
            Restart
          </div>
        ) : null}

        <div className="controls">
          <div className="row">
            <div className={`key ${forward ? "active" : ""}`}></div>
          </div>
          <div className="row">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="row">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div>
        </div>
      </center>
    </div>
  );
}
