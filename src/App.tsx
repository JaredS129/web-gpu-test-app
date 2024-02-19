import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer";

function App() {
  const browserIsWebGPUEnabled = window.navigator.gpu ? true : false;
  const headerRef = useRef(null); // Create a ref for the header

  useEffect(() => {
    if (!browserIsWebGPUEnabled) {
      console.log("WebGPU is not enabled in your browser.");
      return;
    }

    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new WebGPURenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer's canvas to the header element
    if (headerRef.current) {
      (headerRef.current as HTMLElement).appendChild(renderer.domElement);
    }

    const geometry = new THREE.OctahedronGeometry(1);
    const material = new THREE.MeshBasicMaterial({ color: 0x61dafb });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, [browserIsWebGPUEnabled]); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <div ref={headerRef} className="three-container"></div>
        <p>GPU enabled: {browserIsWebGPUEnabled ? "true" : "false"}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
