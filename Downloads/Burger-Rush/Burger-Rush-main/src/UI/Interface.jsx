import { useKeyboardControls } from "@react-three/drei";

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

  return (
    <div className="interface">
      <center>
        <div className="time">0:00</div>
        <div className="restart">Restart</div>

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
