import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuBar from "./menuBar"; // Path to MenuBar.js
import AdminLogin from "./adminLogin"; // Path to AdminLogin.js
import AdminDashboard from "./adminDashboard"; // Path to AdminDashboard.js
import CrimeReportingSystem from "./crimeReportingSystem"; // Path to CrimeReportingSystem.js

const App = () => {
  return (
    <div className="app-container">
      <MenuBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<CrimeReportingSystem />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/admin_login" element={<AdminLogin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
