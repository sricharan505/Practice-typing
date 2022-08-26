import React, { useState } from "react";
import Homepage from "./logic_components/Homepage";
import "./App.css";

function App() {
  return (
    <div className="container-lg" >
      <h1 className="center">Practice your Typing Skills here!</h1>
      <Homepage />
    </div>
  );
}

export default App;
