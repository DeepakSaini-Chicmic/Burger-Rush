import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./UI/Interface";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <KeyboardControls
      map={[
        {
          name: "forward",
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: "backward",
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: "leftward",
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: "rightward",
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: "jump",
          keys: ["Space"],
        },
      ]}
    >
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  </>
);
