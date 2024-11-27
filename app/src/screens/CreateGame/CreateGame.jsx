import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateGame = () => {
  const [selectedSport, setSelectedSport] = useState("Basketball"); // Default selected sport
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Select location"); // Default location
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false); // To toggle dropdown visibility

  const [selectedSkill, setSelectedSkill] = useState("Beginner"); // Default skill level
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false); // To toggle dropdown visibility

  const [selectedGroupChat, setSelectedGroupChat] =
    useState("Select group chat"); // Default group chat
  const [isGroupChatDropdownOpen, setIsGroupChatDropdownOpen] = useState(false); // Toggle visibility
  const [additionalNotes, setAdditionalNotes] = useState(""); // New state variable for additional notes
  const [playerCount, setPlayerCount] = useState(1); // Player count state with default value of 1
  const [playerNames, setPlayerNames] = useState("");
  const locations = ["Penn Park", "Pottruck Gym", "Hamlin Tennis Center"]; // List of locations
  const sports = ["Basketball", "Soccer", "Tennis", "Ultimate Frisbee", "Volleyball"]; // List of sports
  const skillLevels = ["Beginner", "Intermediate", "Advanced"]; // Skill levels
  const groupChats = ["Basketball", "Soccer"]; // List of group chats

  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const location = useLocation();
  const [games, setGames] = useState([
    {
      id: 1,
      data: [
        "Pickup basketball game at Pottruck in 30 mins  3 spots left",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png",
        "Colin Speaker",
        "@cspeaker - 1 hr",
      ],
    },
    {
      id: 2,
      data: [
        "Penn Park fields are open and empty  Perfect for soccer.",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png",
        "Angie Geralis",
        "@ageralis - 5 hr",
      ],
    },
    {
      id: 3,
      data: [
        "Looking for 2 more players for volleyball at Pottruck tonight!",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png",
        "Colin Speaker",
        "@cspeaker - 3 hr",
      ],
    },
    {
      id: 4,
      data: [
        "Anyone up for tennis at Hamlin? Courts are empty right now.",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png",
        "Angie Geralis",
        "@ageralis - 4 hr",
      ],
    },
    {
      id: 5,
      data: [
        "Ultimate frisbee pickup game starting at Penn Park in 15!",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png",
        "Colin Speaker",
        "@cspeaker - 6 hr",
      ],
    },
    {
      id: 6,
      data: [
        "Beautiful day for soccer - organizing a game at Penn Park at 4pm",
        "https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png",
        "Angie Geralis",
        "@ageralis - 7 hr",
      ],
    },
  ]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const CALENDAR_IDS = {
    basketball: "eb800c79fc573ba2d58b2e70ce1c9ae1ab59a5e438326905c160251a525f0ab8@group.calendar.google.com",
    soccer: "49faced00d84f711b9dc72f522dc5aecc3cfe3c4a28ac7a5b02e170dcd62d54b@group.calendar.google.com"
  };

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

  useEffect(() => {
    // Convert to 24-hour format for the input value
    const hour = parseInt(selectedHour);
    const minute = selectedMinute;
    let hours24 =
      selectedPeriod === "PM" && hour !== 12
        ? hour + 12
        : selectedPeriod === "AM" && hour === 12
        ? 0
        : hour;

    hours24 = hours24.toString().padStart(2, "0");
    const timeValue = `${hours24}:${minute}`;
    setSelectedTime(timeValue);
  }, [selectedHour, selectedMinute, selectedPeriod]);

  const handleGroupChatClick = (group) => {
    setSelectedGroupChat(group);
    setIsGroupChatDropdownOpen(false); // Close dropdown after selection
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsSkillDropdownOpen(false); // Close dropdown after selection
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false); // Close dropdown after selection
  };

  const handlePlayerNamesChange = (e) => {
    setPlayerNames(e.target.value); // Update player names state
  };

  const handlePlayerCountChange = (e) => {
    setPlayerCount(e.target.value); // Update player count based on input value
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const handleAdditionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value); // Update additional notes state
  };

  const navigate = useNavigate();

// Modify handleCreateGame
const handleCreateGame = async () => {
  console.log('Create Game button clicked');
  console.log('Current form state:', {
    selectedSport,
    selectedDate,
    selectedTime,
    selectedLocation,
    selectedGroupChat,
    additionalNotes
  });

  try {
    // Authentication code
    await new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        console.log('GAPI client loaded');
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.events" // Add this scope
          });
          
          // Check if user is signed in
          if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            console.log('User not signed in, requesting sign in...');
            await gapi.auth2.getAuthInstance().signIn();
          }
          
          console.log('User is signed in');
          resolve();
        } catch (err) {
          console.error('GAPI initialization error:', err);
          reject(err);
        }
      });
    });


    // Create event object
    const eventDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDateTime = new Date(eventDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    const event = {
      'summary': `PICKUP: ${selectedSport}`,
      'description': additionalNotes,
      'start': {
        'dateTime': eventDateTime.toISOString(),
        'timeZone': 'America/New_York'
      },
      'end': {
        'dateTime': endDateTime.toISOString(),
        'timeZone': 'America/New_York'
      },
      'location': selectedLocation
    };
    console.log('Event object created:', event);

    // Set up target calendars
    const targetCalendars = [CALENDAR_ID];
    if (selectedGroupChat !== "Select group chat") {
      const groupCalendarId = CALENDAR_IDS[selectedGroupChat.toLowerCase()];
      if (groupCalendarId) {
        targetCalendars.push(groupCalendarId);
      }
    }
    console.log('Target calendars:', targetCalendars);

    // Create events
    console.log('Creating events...');
    const createPromises = targetCalendars.map(calendarId => 
      gapi.client.calendar.events.insert({
        'calendarId': calendarId,
        'resource': event
      })
    );

    const responses = await Promise.all(createPromises);
    console.log('Events created successfully:', responses.map(r => r.result));

    navigate("/", { state: { additionalNotes } });
  } catch (error) {
    console.error('Error in handleCreateGame:', error);
  }
};
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


  const generateTimeOptions = () => {
    const options = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const hour = hours % 12 || 12;
        const period = hours < 12 ? "AM" : "PM";
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const time = `${hours.toString().padStart(2, "0")}:${formattedMinutes}`;
        const displayTime = `${hour}:${formattedMinutes} ${period}`;
        options.push(
          <option key={time} value={time}>
            {displayTime}
          </option>
        );
      }
    }
    return options;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const generateHours = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, "0"));
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 15) {
      minutes.push(i.toString().padStart(2, "0"));
    }
    return minutes;
  };

  return (
    <div className="create-game">
      <div className="container">
        <div className="div-wrapper">
          <input
            type="text"
            className="input-additional-notes"
            placeholder="Enter any additional notes, hashtags, and event types"
            value={additionalNotes} // Bind value to state
            onChange={handleAdditionalNotesChange} // Handle input change
          />
        </div>

        <div className="textbox">
          <div className="textfield">
            <input
              type="text"
              className="input-player-names"
              placeholder="Enter player names or select from group chat"
              value={playerNames}
              onChange={handlePlayerNamesChange}
            />
          </div>

          <div className="text-wrapper-2">Players</div>
        </div>

        <div className="overlap">
          <div className="textbox-2">
            <div className="text-wrapper-4">Location</div>
            <div 
              className="textfield-2"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            >
              <div className="text-wrapper-5">{selectedLocation}</div>
              <img
                className="dropdown-indicator"
                alt="Dropdown Arrow"
                src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
              />
            </div>
          </div>

          {isLocationDropdownOpen && (
            <div className="location-dropdown-menu">
              {locations.map((location) => (
                <div
                  key={location}
                  className="location-dropdown-item"
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="textbox-3">
          <div className="text-wrapper-3">Create a New Game</div>
          <Link to="/">
            <img
              className="close"
              alt="Close"
              src="https://c.animaapp.com/BPOawRxV/img/close.svg"
            />
          </Link>
        </div>

        <div className="overlap-group">
          <div className="textbox-4">
            <div className="text-wrapper-4">Sport</div>
            
            <div 
              className="textfield-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="text-wrapper-5">{selectedSport}</div>
              <img
                className="dropdown-indicator"
                alt="Dropdown Arrow"
                src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {sports.map((sport) => (
                <div
                  key={sport}
                  className="dropdown-item"
                  onClick={() => handleSportClick(sport)}
                >
                  {sport}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="overlap-2">
          <div 
            className="textbox-5"
            onClick={() => setIsGroupChatDropdownOpen(!isGroupChatDropdownOpen)}
          >
            <div className="text-selected-group">{selectedGroupChat}</div>
            <img
              className="dropdown-indicator"
              alt="Dropdown Arrow"
              src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
            />
          </div>

          {isGroupChatDropdownOpen && (
            <div className="groupchat-dropdown-menu">
              {groupChats.map((chat) => (
                <div
                  key={chat}
                  className="groupchat-dropdown-item"
                  onClick={() => handleGroupChatClick(chat)}
                >
                  {chat}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="button" onClick={handleCreateGame}>
          <div className="text-wrapper-7">Create Game</div>
        </button>

        <div className="overlap-3">
          <div className="textbox-6">
            <div className="text-wrapper-2">Skill Level</div>
            
            <div 
              className="textfield-3"
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
            >
              <div className="text-wrapper-8">{selectedSkill}</div>
              <img
                className="dropdown-indicator"
                alt="Dropdown Arrow"
                src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
              />
            </div>
          </div>
        </div>
        {isSkillDropdownOpen && (
          <div className="skill-dropdown-menu">
            {skillLevels.map((level) => (
              <div
                key={level}
                className="skill-dropdown-item"
                onClick={() => handleSkillClick(level)}
              >
                {level}
              </div>
            ))}
          </div>
        )}

        <div className="textbox-7">
          <div className="text-wrapper-2">Date</div>

          <div className="textfield-4">
            <input
              type="date"
              className="date-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} // Update state on date change
            />
          </div>
        </div>

        <div className="overlap-group-2">
          <div className="textbox-8">
            <div className="text-wrapper-2">Number of Players</div>

            <div className="textfield-5">
              <input
                type="number"
                value={playerCount}
                min="1"
                max="20" // Optionally set a max limit
                onChange={handlePlayerCountChange}
                className="player-count-input"
              />
            </div>
          </div>

          {/* <img
            className="image-4"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-18@2x.png"
          /> */}
        </div>

        <div className="textbox-9">
          <div className="text-wrapper-10">Time</div>
          <div className="textfield-time">
            <div className="time-input-container">
              <select
                className="time-input hour"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {generateHours().map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span className="time-separator">:</span>
              <select
                className="time-input minute"
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
              >
                {generateMinutes().map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              <select
                className="time-input period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-wrapper-11">Additional Notes</div>
      </div>

      <div className="profile-container">
        

        <div className="avatar">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/BPOawRxV/img/rectangle@2x.png"
          />
        </div>

        
        <div className="text-wrapper-14">My Profile</div>

        <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
          <div className="text-wrapper-sports">My Sports</div>
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
                  cursor: 'default',
                  fontFamily: "Inter, Helvetica",
                  fontSize: '14px'
                }}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="text-wrapper-16">Diana Lim</div>

        <div className="text-wrapper-17">@dianadl</div>

        <div className="text-wrapper-18">Edit</div>
      </div>

      <div className="overlap-4">
        <div className="textbox-10">
          <div className="textfield-7">
            <div className="text-wrapper-19">Basketball Group</div>
          </div>

          <div className="text-wrapper-20">My Chats</div>
        </div>

        <img
          className="basketball"
          alt="Basketball"
          src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/basketball-512.png"
        />
      </div>
      <div className="textbox-11">
        <div className="text-wrapper-23">Soccer Group</div>

        <img
          className="soccer"
          alt="Soccer Ball"
          src="https://cdn-icons-png.flaticon.com/512/53/53283.png"
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


      

      

      {/* <button className="button-4">
        <div className="text-wrapper-24">Create New Game</div>
      </button> */}

      <div className="text-wrapper-25">Pickup@Penn</div>

      <div className="text-wrapper-26">Upcoming Games</div>

      <img
        className="image-6"
        alt="Image"
        src="https://c.animaapp.com/BPOawRxV/img/image-12@2x.png"
      />
    </div>
  );
};
