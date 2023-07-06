import React, { useState } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Paths/Home";
import Rooms from "./Paths/Room";
import Heatmaps from "./Paths/Heatmaps";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Rooms />} />
        <Route path="/heatmaps" element={<Heatmaps />} />
      </Routes>
    </div>
  );
}

export default App;
