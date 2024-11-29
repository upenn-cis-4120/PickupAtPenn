import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export const Community = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [joinedGroups, setJoinedGroups] = useState(() => {
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
  
  const sportsGroups = [
    {
      name: "Basketball",
      members: 45,
      image: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/basketball-512.png",
      description: "Penn Basketball pickup games and community"
    },
    {
      name: "Soccer",
      members: 38,
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
      description: "Soccer enthusiasts at Penn"
    },
    {
      name: "Tennis",
      members: 24,
      image: "https://cdn-icons-png.flaticon.com/512/657/657656.png",
      description: "Tennis players looking for partners"
    },
    {
      name: "Volleyball",
      members: 30,
      image: "https://png.pngtree.com/png-clipart/20230405/original/pngtree-volleyball-vector-icon-design-illustration-png-image_9026472.png",
      description: "Indoor/Outdoor volleyball group"
    },
    {
      name: "Ultimate Frisbee",
      members: 28,
      image: "https://cdn-icons-png.flaticon.com/256/903/903219.png",
      description: "Ultimate frisbee games at Penn Park"
    }
  ];

  const filteredSports = sportsGroups.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (sportName) => {
    if (joinedGroups.includes(sportName)) {
      alert(`You are already a member of the ${sportName} group!`);
    } else {
      const updatedGroups = [...joinedGroups, sportName];
      setJoinedGroups(updatedGroups);
      localStorage.setItem('joinedSports', JSON.stringify(updatedGroups));
      alert(`Successfully joined the ${sportName} group!`);
    }
  };

  return (
    <div className="community">
      {/* Header Menu */}
      <div className="container-3">
        <div className="header-menu">
          <Link to="/schedule">
            <div className="frame">
              <div className="text-wrapper-menu1">Schedule</div>
            </div>
          </Link>

          <Link to="/group-availability">
            <div className="frame-2">
              <div className="text-wrapper-menu1">Availability</div>
            </div>
          </Link>

          <Link to="/community">
            <div className="frame-3">
              <div className="text-wrapper-bold">Community</div>
            </div>
          </Link>

          <Link to="/map">
            <div className="frame-4">
              <div className="text-wrapper-menu3">Map</div>
            </div>
          </Link>
          <Link to="/about">
              <div className="frame-about">
                <div className="text-wrapper-about">About</div>
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



      {/* Rest of your Community page content goes here */}
      <div className="community-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search sports groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sports-grid">
          {filteredSports.map((sport, index) => (
            <div key={index} className="sport-tile">
              <img src={sport.image} alt={sport.name} className="sport-icon" />
              <div className="sport-info">
                <h3>{sport.name}</h3>
                <p>{sport.description}</p>
                <span className="member-count">{sport.members} members</span>
              </div>
              <button 
                className="join-button"
                onClick={() => handleJoinGroup(sport.name)}
              >
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
       
    </div>
  );
};