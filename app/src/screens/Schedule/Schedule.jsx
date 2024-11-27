import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";

export const Schedule = () => {
  const CLIENT_ID = "7058040155-g739av7vkfgl73dbvk6mrkiadt6vdjs5.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBYdgzwDYfT95WAoyNEGH8BD2A7ZujvwCk";
  const CLIENT_SECRET = "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"; // Replace with your actual client secret
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events.readonly";

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const REDIRECT_URI = window.location.origin;

  // Function to initialize gapi client
  const initClient = (accessToken) => {
    gapi.load("client", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth.setToken({ access_token: accessToken });
          fetchEvents();
        })
        .catch((err) => setError("Error initializing client: " + err.message));
    });
  };

  // Function to fetch Google Calendar events
  const fetchEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "f447f8579b4a1493049fbea49a613748677a5754a3ec46b076c57f08cc08d5ef@group.calendar.google.com",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
        headers: {
          Authorization: `Bearer ${gapi.auth.getToken().access_token}`
        }
      })
      .then((response) => {
        console.log("Events response:", response);
        setEvents(response.result.items);
      })
      .catch((err) => {
        console.error("Fetch events error:", err);
        setError("Error fetching events: " + err.message);
      });
  };

  // Login function
  const login = useGoogleLogin({
    flow: "auth-code", // Use redirect-based flow
    onSuccess: (codeResponse) => {
      console.log("Redirect URI:", REDIRECT_URI);
      console.log("Auth Code:", codeResponse.code);

      // Exchange the authorization code for an access token
      fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: codeResponse.code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      })
      .then((response) => {
        if (!response.ok) {
            return response.json().then((err) => {
                console.error("Token Exchange Error:", err);
                throw new Error(err.error_description || "Token exchange failed");
            });
        }
        return response.json();
    })
        .then((data) => {
          console.log("Access Token:", data.access_token);
          initClient(data.access_token);
        })
        .catch((err) => setError("Error exchanging code: " + err.message));
    },
    onError: () => setError("Login failed."),
    redirectUri: REDIRECT_URI,
  });

  console.log("Redirect URI (raw):", REDIRECT_URI);
  console.log("Redirect URI components:", {
    origin: window.location.origin,
    pathname: "/schedule",
    full: window.location.origin + "/schedule"
  });

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="schedule">
        <div className="overlap">
          <div className="overlap-group">
            <div className="container-26">
              {/* Header Menu */}
              <div className="header-menu">
                <Link to="/schedule">
                  <div className="frame">
                    <div className="text-wrapper-bold">Schedule</div>
                  </div>
                </Link>
                <Link to="/group-availability">
                  <div className="frame-2">
                    <div className="text-wrapper-menu">Availability</div>
                  </div>
                </Link>
                <Link to="/community">
                <div className="frame-3">
                  <div className="text-wrapper-menu">Community</div>
                </div>
                </Link>
                <Link to="/map">
                  <div className="frame-4">
                    <div className="text-wrapper-menu">Map</div>
                  </div>
                </Link>
              </div>
              <Link to="/">
                <div className="text-wrapper-menu-title">Pickup@Penn</div>
              </Link>
              <Link to="/profile">
                <img
                  className="prof"
                  alt="Profile"
                  src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
                />
              </Link>
              <Link to="/">
                <img
                  className="logo"
                  alt="Logo"
                  src="https://c.animaapp.com/RqvJyPyX/img/image-28@2x.png"
                />
              </Link>
            </div>

            {/* Calendar Container */}
          <div className="container">
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginBottom: '20px',
              alignItems: 'center'
            }}>
              <button 
                onClick={login} 
                className="sync-button"
              >
                <img 
                  src="https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_31_2x.png"
                  alt="Google Calendar"
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
                Sync to Google Calendar
              </button>

              <Link to="/create-game-prefill">
                <button className="create-game-button">
                  <div className="create-game-text">Create New Game</div>
                  <img
                    className="create-game-icon"
                    alt="Add"
                    src="https://c.animaapp.com/RqvJyPyX/img/e-add.svg"
                  />
                </button>
              </Link>
            </div>

            <iframe 
              src="https://calendar.google.com/calendar/embed?src=f447f8579b4a1493049fbea49a613748677a5754a3ec46b076c57f08cc08d5ef%40group.calendar.google.com&ctz=America%2FNew_York" 
              style={{
                border: 0,
                width: '100%',
                height: '80vh', // Increased height to take up more vertical space
                borderRadius: '12px'
              }}
              frameBorder="0" 
              scrolling="no"
              title="Group Calendar"
            />
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};
