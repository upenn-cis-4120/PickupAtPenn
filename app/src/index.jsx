import "../global.css";
import 'leaflet/dist/leaflet.css';
import React from "react";
import { Schedule } from "./screens/Schedule";
import { Home } from "./screens/Home";
import { CreateGame } from "./screens/CreateGame";
import { GroupAvailability } from "./screens/GroupAvailability";
import { YourAvailability } from "./screens/YourAvailability";
import { Map } from "./screens/Map";
import reactDom from "react-dom/client";
import ReactDOMClient from "react-dom/client"; // Ensure the correct capitalization
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// to run, navigate to folder, npm install, npm start
const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

// change the Home to CreateGame or Schedule to navigate for now
//oot.render(<Home />);
root.render(
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/availability" element={<YourAvailability />} />
      <Route path="/group-availability" element={<GroupAvailability />} />
      <Route path="/create-game" element={<CreateGame />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  </Router>
);