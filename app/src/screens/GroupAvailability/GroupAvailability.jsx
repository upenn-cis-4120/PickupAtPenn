import React, {useState, useEffect} from "react";
import "./style.css";

import { Link } from 'react-router-dom';
import { gapi } from "gapi-script";

export const GroupAvailability = () => {
  const [personalEvents, setPersonalEvents] = useState([]);
  const [groupEvents, setGroupEvents] = useState([]);
  const [selectedSport, setSelectedSport] = useState('basketball'); // Add this state


  const CLIENT_ID = "7058040155-g739av7vkfgl73dbvk6mrkiadt6vdjs5.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBYdgzwDYfT95WAoyNEGH8BD2A7ZujvwCk";
  const PERSONAL_CALENDAR_ID = "f447f8579b4a1493049fbea49a613748677a5754a3ec46b076c57f08cc08d5ef@group.calendar.google.com";
  const GROUP_CALENDAR_ID = "eb800c79fc573ba2d58b2e70ce1c9ae1ab59a5e438326905c160251a525f0ab8@group.calendar.google.com";

  const CALENDAR_IDS = {
    basketball: "eb800c79fc573ba2d58b2e70ce1c9ae1ab59a5e438326905c160251a525f0ab8@group.calendar.google.com",
    soccer: "49faced00d84f711b9dc72f522dc5aecc3cfe3c4a28ac7a5b02e170dcd62d54b@group.calendar.google.com",
    tennis: "84956440b324a534d62f69b17cfdb8341ee611e4d8ba7a08ec28626ff13faab4@group.calendar.google.com",
    ultimate: "2a00b6779e231bd572c46175877cb15d13b986b4a0fc34a63132f9fde0b18d63@group.calendar.google.com",
    volleyball: "8189e2a40f40df2be0724136638eef8c0e37f390a67868d9f4fa9710f0a42c27@group.calendar.google.com"
  };
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
  // Modify fetchEvents to use the selected sport's calendar
  const fetchEvents = () => {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    // Fetch personal events (unchanged)
    gapi.client.calendar.events
      .list({
        calendarId: PERSONAL_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        timeMax: oneWeekFromNow.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        setPersonalEvents(response.result.items);
      })
      .catch((err) => console.error("Error fetching personal events:", err));

    // Fetch group events
    gapi.client.calendar.events
      .list({
        calendarId: CALENDAR_IDS[selectedSport],
        timeMin: new Date().toISOString(),
        timeMax: oneWeekFromNow.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        setGroupEvents(response.result.items);
      })
      .catch((err) => console.error("Error fetching group events:", err));
  };

  useEffect(() => {
    if (gapi.client) {
      fetchEvents();
    }
  }, [selectedSport]);

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
  };

  // Add new function to create time grid
  const createTimeGrid = (events) => {
    // Initialize grid with objects containing count and names array
    const grid = Array(7).fill().map(() => 
      Array(12).fill().map(() => ({ count: 0, names: [] }))
    );
    
    events.forEach(event => {
      const startDate = new Date(event.start.dateTime || event.start.date);
      const endDate = new Date(event.end.dateTime || event.end.date);
      
      const dayIndex = startDate.getDay();
      let startHour = startDate.getHours();
      let endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      
      // Adjust end hour if there are minutes
      if (endMinutes > 0) {
        endHour += 1;
      }
      
      // Only process hours between 9 and 21 (9 AM to 9 PM)
      startHour = Math.max(9, startHour);
      endHour = Math.min(21, endHour);
      
      const startIndex = Math.max(0, startHour - 9);
      const endIndex = Math.min(11, endHour - 9);

      // Extract name from event summary
      let name = "Diana"; // Default name
      if (event.summary && event.summary.startsWith("Busy:")) {
        name = event.summary.substring(5).trim();
      }

      // Update both count and names array
      for (let i = startIndex; i < endIndex; i++) {
        if (grid[dayIndex] && grid[dayIndex][i] !== undefined) {
          grid[dayIndex][i].count++;
          if (!grid[dayIndex][i].names.includes(name)) {
            grid[dayIndex][i].names.push(name);
          }
        }
      }
    });
    
    return grid;
  };

  // For personal availability (container-2)
const createPersonalTimeGrid = (events) => {
  const grid = Array(7).fill().map(() => Array(12).fill(0));
  
  events.forEach(event => {
    const startDate = new Date(event.start.dateTime || event.start.date);
    const endDate = new Date(event.end.dateTime || event.end.date);
    
    const dayIndex = startDate.getDay();
    let startHour = startDate.getHours();
    let endHour = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    
    if (endMinutes > 0) {
      endHour += 1;
    }
    
    startHour = Math.max(9, startHour);
    endHour = Math.min(21, endHour);
    
    const startIndex = Math.max(0, startHour - 9);
    const endIndex = Math.min(11, endHour - 9);
    
    for (let i = startIndex; i < endIndex; i++) {
      if (grid[dayIndex] && grid[dayIndex][i] !== undefined) {
        grid[dayIndex][i]++;
      }
    }
  });
  
  return grid;
};

  // Get joined sports from localStorage
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

  // Add a mapping object for sport name conversions
  const sportNameMapping = {
    'Ultimate Frisbee': 'ultimate',
    'Basketball': 'basketball',
    'Soccer': 'soccer',
    'Tennis': 'tennis',
    'Volleyball': 'volleyball'
  };

  return (
    <div className="group-availability">
       {/* Header Menu */}
       <div className="container-3">
        <div className="header-menu">
          <Link to="/schedule">
          <div className="frame">
            <div className="text-wrapper-menu">Schedule</div>
          </div>
          </Link>

          <Link to="/group-availability">
          <div className="frame-2">
            <div className="text-wrapper-bold">Availability</div>
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
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
        />
        </Link>

        <Link to="/">
        <img
          className="logo"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/image-28@2x.png"
        />
        </Link>
      </div>
      <div className="container-2">
      <div className="header-row">
        <h2 className="group-s-availability">Your Availability</h2>
        </div>
        <div className="availability-grid">
          <div className="time-labels">
            {Array(12).fill().map((_, i) => (
              <div key={i} className="time-label">
                {`${i + 9}:00`}
              </div>
            ))}
          </div>
          <div className="day-labels">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="day-label">{day}</div>
            ))}
          </div>
          <div className="grid">
          {createPersonalTimeGrid(personalEvents).map((day, dayIndex) => (
            <div key={dayIndex} className="day-column">
              {day.map((count, timeIndex) => (
                <div 
                  key={`${dayIndex}-${timeIndex}`} 
                  className={`grid-cell busy-${Math.min(count, 1)}`}
                />
              ))}
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="container-4">
      <div className="header-row">
        <h2 className="group-s-availability">Group Availability</h2>
        <select 
          value={selectedSport}
          onChange={handleSportChange}
          className="sport-selector"
        >
          {joinedSports.map(sport => (
            <option 
              key={sport} 
              value={sportNameMapping[sport] || sport.toLowerCase()}
            >
              {sport}
            </option>
          ))}
        </select>
      </div>
  <div className="availability-grid">
    <div className="time-labels">
      {Array(12).fill().map((_, i) => (
        <div key={i} className="time-label">
          {`${i + 9}:00`}
        </div>
      ))}
    </div>
    <div className="day-labels">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="day-label">{day}</div>
      ))}
    </div>
      <div className="grid">
    {createTimeGrid(groupEvents).map((day, dayIndex) => (
      <div key={dayIndex} className="day-column">
        {day.map((cell, timeIndex) => (
          <div 
            key={`${dayIndex}-${timeIndex}`} 
            className={`grid-cell busy-${Math.min(cell.count, 4)}`}
            data-tooltip={cell.names.length > 0 ? cell.names.join(", ") : null}
          />
        ))}
      </div>
    ))}
</div>
    </div>
  </div>
  </div>
  );
};
