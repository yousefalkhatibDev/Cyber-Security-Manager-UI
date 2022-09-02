import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";

// components
import NavBar from "./components/NavBar";
import PrivateRoute from "./Router/PrivateRoute";

// screens
import Dashboard from "./pages/Dashboard";
import TargetProfile from "./pages/TargetProfile";
import OperationProfile from "./pages/OperationProfile";
import Operations from "./pages/Operations";
import Targets from "./pages/Targets";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/target_profile/:id"
            element={
              <PrivateRoute>
                <TargetProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/operations"
            element={
              <PrivateRoute>
                <Operations />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/targets"
            element={
              <PrivateRoute>
                <Targets />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/operation_profile/:id"
            element={
              <PrivateRoute>
                <OperationProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
