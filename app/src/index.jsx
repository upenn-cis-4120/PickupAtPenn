import "../global.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { Schedule } from "./screens/Schedule";
import { Home } from "./screens/Home";
import { CreateGame } from "./screens/CreateGame";
import { GroupAvailability } from "./screens/GroupAvailability";
import { YourAvailability } from "./screens/YourAvailability";

// to run, navigate to folder, npm install, npm start
const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

// change the Home to CreateGame or Schedule to navigate for now
root.render(<Home />);
