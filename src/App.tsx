import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const browserIsWebGPUEnabled = window.navigator.gpu ? true : false;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
