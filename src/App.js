import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import RouteBar from "./layout/RouteBar";

// screens
import Dashboard from "./layout/Dashboard";
import TargetProfile from "./layout/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteBar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/profile" element={<TargetProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
