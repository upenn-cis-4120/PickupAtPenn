import "../global.css";
import 'leaflet/dist/leaflet.css';
import React from "react";
import { Schedule } from "./screens/Schedule";
import { Home } from "./screens/Home";
import { CreateGame } from "./screens/CreateGame";
import { GroupAvailability } from "./screens/GroupAvailability";
import { YourAvailability } from "./screens/YourAvailability";
import { Map } from "./screens/Map";
import { Community } from "./screens/Community";
import { Profile } from "./screens/Profile";
import { BasketballChat } from "./screens/BasketballChat";
import { SoccerChat } from "./screens/SoccerChat";
import { CreateGamePrefill } from "./screens/CreateGamePrefill";
import reactDom from "react-dom/client";
import ReactDOMClient from "react-dom/client"; // Ensure the correct capitalization
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Ensure the import for GoogleOAuthProvider


// to run, navigate to folder, npm install, npm start
const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
const CLIENT_ID = "7058040155-g739av7vkfgl73dbvk6mrkiadt6vdjs5.apps.googleusercontent.com"; // Replace with your actual Google Client ID


// change the Home to CreateGame or Schedule to navigate for now
//oot.render(<Home />);
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/availability" element={<YourAvailability />} />
        <Route path="/group-availability" element={<GroupAvailability />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/map" element={<Map />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/basketball-chat" element={<BasketballChat />} />
        <Route path="/soccer-chat" element={<SoccerChat />} />  
        <Route path="/create-game-prefill" element={<CreateGamePrefill />} />
      </Routes>
    </Router>
  </GoogleOAuthProvider>
);
