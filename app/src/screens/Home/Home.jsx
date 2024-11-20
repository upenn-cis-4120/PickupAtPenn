import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { gapi } from "gapi-script";

export const Home = () => {
  const location = useLocation();
  const [games, setGames] = useState([
    { id: 1, data: ["Pickup basketball game at Pottruck in 30 mins  3 spots left",  "https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png", "Colin Speaker", "@cspeaker -- 1 hr"]},
    { id: 2, data: ["Penn Park fields are open and empty  Perfect for soccer.","https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png", "Angie Geralis", "@ageralis -- 5 hr"]}, 
  ]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Add these constants from Schedule.jsx
  const CLIENT_ID = "7058040155-g739av7vkfgl73dbvk6mrkiadt6vdjs5.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBYdgzwDYfT95WAoyNEGH8BD2A7ZujvwCk";
  const CALENDAR_ID = "f447f8579b4a1493049fbea49a613748677a5754a3ec46b076c57f08cc08d5ef@group.calendar.google.com";

  // Function to initialize Google Calendar API
  const initCalendar = () => {
    gapi.load("client", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        })
        .then(() => {
          fetchEvents();
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


  

  return (
    
    <div className="home">
      {games.map((game, index) => (
        <div key={game.id} className={index === 0 ? "container-2" : "container"}>
          <p className={index === 0 ? "pickup-basketball" : "pickup-basketball"}>{game.data[0]}</p>
          <button className="div-wrapper">
            <div className="text-wrapper-3">Join Game</div>
          </button>
          <div className="rectangle-wrapper">
            <img
              className="rectangle"
              alt="Rectangle"
              src={game.data[1]}//"https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png"
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
          <div className="frame-3">
            <div className="text-wrapper-6">Community</div>
          </div>

          <Link to="/map">
          <div className="frame-4">
            <div className="text-wrapper-6">Map</div>
          </div>
          </Link>
        </div>
        <Link to="/">
        <div className="text-wrapper-7">Pickup@Penn</div>
        </Link>

        <Link to="/availability">
        <img
          className="image"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/image-27@2x.png"
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
        <button className="button-2">
          <div className="text-wrapper-8">Basketball</div>
        </button>

        <div className="img-wrapper">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
          />
        </div>

        <button className="button-3">
          <div className="text-wrapper-3">Soccer</div>
        </button>

        <div className="text-wrapper-9">My Profile</div>

        <div className="text-wrapper-10">My Sports</div>

        <div className="text-wrapper-11">Diana Lim</div>

        <div className="text-wrapper-12">@dianadl</div>

        <div className="text-wrapper-13">Edit</div>
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
          src="https://c.animaapp.com/RqvJyPyX/img/image-26@2x.png"
        />
      </div>
      <div className="chat-textbox-11">
        <div className="chat-text-wrapper-23">Soccer Group</div>

        <img
          className="soccer"
          alt="Ecology"
          src="https://c.animaapp.com/RqvJyPyX/img/soccer-ball.svg"
        />
      </div>

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
