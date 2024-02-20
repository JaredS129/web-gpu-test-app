import "./App.css";
import { useRef, useState } from "react";
import { OrbitControls, Splat } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";

// New component to use the useFrame hook
function AnimatedScene() {
  const orbitRef = useRef(null);
  const [lastPosition, setLastPosition] = useState("");

  // This hook can now correctly access R3F context since it's used within a child of Canvas
  useFrame((state) => {
    const camera = state.camera;
    const currentPosition = JSON.stringify(camera.position.toArray());
    if (currentPosition !== lastPosition) {
      console.log("Camera position changed:", camera.position.toArray());
      setLastPosition(currentPosition);
    }
  });

  return (
    <>
      <Splat
        src={`https://huggingface.co/datasets/JaredS129/gaussian-splats/resolve/main/me2.splat`}
        position={[0, 0, 0]}
        scale={2}
      />
      <OrbitControls ref={orbitRef} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    </>
  );
}

function App() {
  // const browserIsWebGPUEnabled = window.navigator.gpu ? true : false;

  return (
    <div className="App">
      <header className="App-header">
        <Canvas
          camera={{
            position: [
              -1.371294187025076, 0.17211949426393394, 0.3114633625316161,
            ],
            fov: 50,
          }}
          style={{ height: "50rem" }}
        >
          <AnimatedScene />
        </Canvas>
        <p>CLICK AND DRAG</p>
      </header>
    </div>
  );
}

export default App;
