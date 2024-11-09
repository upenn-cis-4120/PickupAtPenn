import "../global.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { Schedule } from "./screens/Schedule";
import { Home } from "./screens/Home";
import { CreateGame } from "./screens/CreateGame";
import { GroupAvailability } from "./screens/GroupAvailability";
import { YourAvailability } from "./screens/YourAvailability";
import reactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// to run, navigate to folder, npm install, npm start
const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

// change the Home to CreateGame or Schedule to navigate for now
root.render(<Home />);
reactDom.createRoot(document.getElementById("app")).render(
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/availability" element={<YourAvailability />} />
      <Route path="/group-availability" element={<GroupAvailability />} />
      <Route path="/create-game" element={<CreateGame />} />
    </Routes>
  </Router>
);