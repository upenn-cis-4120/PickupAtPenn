import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { gapi } from "gapi-script";
import colinImage from './colin.jpg';  // Adjust path as needed
import angieImage from './angie.jpg';  // Adjust path as needed


export const Home = () => {
  const location = useLocation();
  const [games, setGames] = useState([
    { id: 1, data: ["Pickup basketball game at Pottruck in tonight.  3 spots left",  colinImage, "Colin Speaker", "@cspeaker -- 1 hr"]},
    { id: 2, data: ["Penn Park fields are open and empty tomorrow. Perfect for soccer.",angieImage, "Angie Geralis", "@ageralis -- 5 hr"]}, 
  ]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Add these constants from Schedule.jsx
  const CLIENT_ID = "7058040155-g739av7vkfgl73dbvk6mrkiadt6vdjs5.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBYdgzwDYfT95WAoyNEGH8BD2A7ZujvwCk";
  const CALENDAR_ID = "f447f8579b4a1493049fbea49a613748677a5754a3ec46b076c57f08cc08d5ef@group.calendar.google.com";

  // Add state for tooltip visibility
  const [showTooltip, setShowTooltip] = useState(-1); // -1 means no tooltip shown

  // Add state for joined sports
  const [joinedSports, setJoinedSports] = useState(() => {
    // Check if this is a fresh application start
    const isAppInitialized = localStorage.getItem('appInitialized');
    
    if (!isAppInitialized) {
      // First time app is starting, set defaults
      localStorage.setItem('joinedSports', JSON.stringify(['Basketball', 'Soccer']));
      localStorage.setItem('appInitialized', 'true');
      return ['Basketball', 'Soccer'];
    }
    
    // Otherwise, get existing joined sports
    const saved = localStorage.getItem('joinedSports');
    return saved ? JSON.parse(saved) : ['Basketball', 'Soccer'];
  });

  // Clean up initialization flag when component unmounts
  useEffect(() => {
    return () => {
      // Only remove the flag when the app is actually closing
      window.addEventListener('beforeunload', () => {
        localStorage.removeItem('appInitialized');
      });
    };
  }, []);

  // Function to initialize Google Calendar API
  const initCalendar = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar.events"
        })
        .then(() => {
          // Initialize auth instance
          return gapi.auth2.getAuthInstance().isSignedIn.get();
        })
        .then((isSignedIn) => {
          if (isSignedIn) {
            fetchEvents();
          }
        })
        .catch((err) => console.error("Error initializing calendar:", err));
    });
  };

  // Function to fetch calendar events
  const fetchEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 7, // Limit to 7 events
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        setCalendarEvents(events);
      })
      .catch((err) => console.error("Error fetching events:", err));
  };

  useEffect(() => {
    initCalendar();
  }, []); // Run once on component mount

  // Your existing games useEffect
  useEffect(() => {
    if (location.state?.additionalNotes) {
      setGames(prevGames => [
        { id: Date.now(), data: [location.state.additionalNotes, "https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png", "Diana Lim", "@dianadl -- just now"] },
        ...prevGames
      ]);
    }
  }, [location.state]);

  // Helper function to format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
  };

  // Helper function to get formatted dates
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  // Add this function after the formatDateTime function
  const addToCalendar = (sport, isToday) => {
    const eventDate = new Date();
    if (!isToday) {
      eventDate.setDate(eventDate.getDate() + 1); // Set to tomorrow for soccer
    }
    
    // Set the time based on the sport
    const hour = isToday ? 18 : 15; // 6PM for basketball, 3PM for soccer
    eventDate.setHours(hour, 0, 0); // Set minutes and seconds to 0
    
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 2); // 2-hour game duration

    const event = {
      summary: `PICKUP: ${sport}`,
      location: isToday ? 'Pottruck Gym' : 'Penn Park',
      start: {
        dateTime: eventDate.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/New_York',
      },
    };

    gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    })
    .then(() => {
      alert(`Successfully joined the ${sport} game!`);
      fetchEvents(); // Refresh the events list
    })
    .catch((err) => {
      console.error('Error adding event:', err);
      alert('Failed to join the game. Please try again.');
    });
  };

  // Add this function to handle Google authentication
  const handleGoogleAuth = (sport, isToday) => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        addToCalendar(sport, isToday);
      })
      .catch((err) => {
        console.error('Auth error:', err);
        alert('Failed to authenticate with Google. Please try again.');
      });
  };

  return (
    
    <div className="home">
      {games.map((game, index) => (
        <div key={game.id} className={index === 0 ? "container-2" : "container"}>
          <p className={index === 0 ? "pickup-basketball" : "pickup-basketball"}>{game.data[0]}</p>
          <button 
            className="div-wrapper"
            onMouseEnter={() => setShowTooltip(index)}
            onMouseLeave={() => setShowTooltip(-1)}
            onClick={() => handleGoogleAuth(index === 0 ? 'Basketball' : 'Soccer', index === 0)}
          >
            <div className="text-wrapper-3">Join Game</div>
            {showTooltip === index && (
              <div className="tooltip-popup">
                {index === 0 
                  ? `Join basketball game at 6pm, on ${getTodayDate()}?` 
                  : `Join soccer game at 3pm, on ${getTomorrowDate()}?`}
              </div>
            )}
          </button>
          <div className="rectangle-wrapper">
            <img
              className="rectangle"
              alt="Rectangle"
              src={game.data[1]}
            />
          </div>
          <div className="overlap">
            <div className="text-wrapper-2">{game.data[2]}</div>
            <div className="text-wrapper-4">{game.data[3]}</div>
          </div>
        </div>
      ))}
      
    
      <div className="container-3">
        <div className="header-menu">
          <Link to="/schedule">
          <div className="frame">
            <div className="text-wrapper-5">Schedule</div>
          </div>
          </Link>

          <Link to="/group-availability">
          <div className="frame-2">
            <div className="text-wrapper-6">Availability</div>
          </div>
          </Link>
          <Link to="/community">
          <div className="frame-3">
            <div className="text-wrapper-6">Community</div>
          </div>
          </Link>
          <Link to="/map">
          <div className="frame-4">
            <div className="text-wrapper-6">Map</div>
          </div>
          </Link>
        </div>
        <Link to="/">
        <div className="text-wrapper-7">Pickup@Penn</div>
        </Link>

        <Link to="/profile">
        <img
          className="image"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
        />
        </Link>


        <Link to="/">
        <img
          className="img"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/image-28@2x.png"
        />
        </Link>
      </div>

      <div className="profile-container">
        <div className="text-wrapper-9">My Profile</div>
        <div className="text-wrapper-11">Diana Lim</div>
        <div className="text-wrapper-12">@dianadl</div>
        <Link to="/profile">
          <div className="text-wrapper-13">Edit</div>
        </Link>

        <div className="img-wrapper">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
          />
        </div>

        <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
          <div className="text-wrapper-10">My Sports</div>
          <div className="sports-buttons-container">
            {joinedSports.map((sport, index) => (
              <button 
                key={index} 
                className="sport-button"
                style={{
                  backgroundColor: '#091e57',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '21px',
                  border: '1px solid #485782',
                  margin: '5px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontFamily: "Inter, Helvetica",
                  fontSize: '14px'
                }}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="overlap-2">
        <div className="textbox">
          <div className="text-wrapper-14">My Chats</div>

          <div className="textfield">
            <div className="text-wrapper-15">Basketball Group</div>
          </div>
        </div>

        <img
          className="image-2"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/image-26@2x.png"
        />
      </div>
      <div className="textbox-2">
        <div className="text-wrapper-22">Soccer Group</div>

        <img
          className="soccer-ball"
          alt="Soccer ball"
          src="https://c.animaapp.com/RqvJyPyX/img/soccer-ball.svg"
        />
      </div> */}
      <Link to="/basketball-chat">
      <div className="chat-overlap-4">
        <div className="chat-textbox-10">
          <div className="chat-textfield-7">
            <div className="chat-text-wrapper-19">Basketball Group</div>
          </div>

          <div className="chat-text-wrapper-20">My Chats</div>
        </div>

        <img
          className="basketball"
          alt="Basketball"
          src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/basketball-512.png"
        />
      </div>
      </Link>
      <Link to="/soccer-chat">
      <div className="chat-textbox-11">
        <div className="chat-text-wrapper-23">Soccer Group</div>

        <img
          className="soccer"
          alt="Ecology"
          src="https://cdn-icons-png.flaticon.com/512/53/53283.png"
        />
      </div>
      </Link>

<div className="container-upcoming-games">
  {calendarEvents
    .filter(event => event.summary?.startsWith('PICKUP:'))
    .map((event, index) => {
      const { date, time } = formatDateTime(event.start.dateTime || event.start.date);
      const location = event.location || "Location TBD";
      const sport = event.summary?.replace('PICKUP:', '').trim().split(" ")[0] || "Sport";

      return (
        <div key={event.id} className="event-item">
          <div className="sport">{sport}</div>
          <div className="event-details">
            {`${date}, ${time}`}
            <br />
            {location}
          </div>
        </div>
      );
  })}
</div>

      
      <Link to="/create-game">
      <button className="button-4">
        <div className="text-wrapper-23">Create New Game</div>

        <img
          className="e-add"
          alt="E add"
          src="https://c.animaapp.com/RqvJyPyX/img/e-add.svg"
        />
      </button>
      </Link>

      <div className="text-wrapper-24">Upcoming Games</div>

      <div className="text-wrapper-25">Community Feed</div>
    </div>
  );
};
