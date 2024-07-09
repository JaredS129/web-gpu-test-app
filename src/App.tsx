import "./App.css";
import { useRef, useState } from "react";
import { OrbitControls, Splat } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import { Slider, Switch, Button, Typography, Card, Row, Col } from "antd";
declare global {
  interface Window {
    max: any;
  }
}

const { max } = window;

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
  const { Title } = Typography;
  const [sliderValue, setSliderValue] = useState(30);
  const [toggleValue, setToggleValue] = useState(false);

  const handleSliderChange = (value: number) => {
    max.outlet(value);
    setSliderValue(value);
  };

  const handleToggleChange = (value: boolean) => {
    max.outlet(value);
  };

  max.bindInlet("slider", function (value: number) {
    setSliderValue(value);
  });

  max.bindInlet("toggle", function (value: boolean) {
    setToggleValue(value);
  });

  return (
    <>
      <div className="App bg">
        <Title
          level={1}
          type="success"
          style={{
            color: "white",
            border: "2px solid #1677ff",
            padding: "0.2rem 1rem 0.5rem 1rem",
            borderRadius: "0.5rem",
          }}
        >
          React x Max
        </Title>
        <Title level={4} style={{ color: "white" }}>
          Click & drag my face
        </Title>
        <Canvas
          camera={{
            position: [
              -1.371294187025076, 0.17211949426393394, 0.3114633625316161,
            ],
            fov: 50,
          }}
          style={{ height: "20rem" }}
        >
          <AnimatedScene />
        </Canvas>
        <Card className="inputs" title="Max output">
          <Row>
            <Col span={8}>
              <Button
                type="primary"
                onClick={() => {
                  max.outlet("Button: Clicked");
                }}
              >
                Primary Button
              </Button>
            </Col>
            <Col span={8}>
              <Slider
                defaultValue={30}
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </Col>
            <Col span={8}>
              <Switch onChange={handleToggleChange} checked={toggleValue} />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default App;
