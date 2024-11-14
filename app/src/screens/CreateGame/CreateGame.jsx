import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const CreateGame = () => {

  const [selectedSport, setSelectedSport] = useState('Basketball'); // Default selected sport
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(''); 
  const [selectedLocation, setSelectedLocation] = useState('Select location'); // Default location
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false); // To toggle dropdown visibility

  const [selectedSkill, setSelectedSkill] = useState('Beginner'); // Default skill level
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false); // To toggle dropdown visibility

  const [selectedGroupChat, setSelectedGroupChat] = useState('Select group chat'); // Default group chat
  const [isGroupChatDropdownOpen, setIsGroupChatDropdownOpen] = useState(false); // Toggle visibility
  const [additionalNotes, setAdditionalNotes] = useState(''); // New state variable for additional notes
  const [playerCount, setPlayerCount] = useState(1); // Player count state with default value of 1
  const [playerNames, setPlayerNames] = useState('');
  const locations = ['Penn Park', 'Pottruck Gym', 'Hamlin Tennis Center']; // List of locations
  const sports = ['Basketball', 'Soccer', 'Tennis', 'Baseball', 'Volleyball']; // List of sports
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced']; // Skill levels
  const groupChats = ['Basketball', 'Soccer']; // List of group chats

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

  const handleCreateGame = () => {
    // Redirect to Home with additionalNotes data
    navigate("/", { state: { additionalNotes } });
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
          <div className="textfield-2">
              <div className="text-wrapper-5">{selectedLocation}</div>
            </div>
            <img
              className="img dropdown-arrow"
              alt="Dropdown Arrow"
              src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            />
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

            <div className="textfield-2">
          <div className="text-wrapper-5">{selectedSport}</div>
        </div>

        <img
          className="img dropdown-arrow"
          alt="Dropdown Arrow"
          src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on arrow click
        />
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
        <div className="textbox-5">
          {/* <div className="text-wrapper-6">Group Chat</div> */}

          {/* Display selected group chat */}
          <div className="text-selected-group">{selectedGroupChat}</div>
          
          {/* Dropdown arrow to toggle visibility */}
          <img
            className="image-2 dropdown-arrow"
            alt="Dropdown Arrow"
            src="https://c.animaapp.com/BPOawRxV/img/image-17@2x.png"
            onClick={() => setIsGroupChatDropdownOpen(!isGroupChatDropdownOpen)}
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

            <div className="textfield-3">
            <div className="text-wrapper-8">{selectedSkill}</div>
          </div>
          </div>

          <img
            className="image-3 dropdown-arrow"
            alt="Dropdown Arrow"
            src="https://c.animaapp.com/BPOawRxV/img/image-13@2x.png"
            onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)} // Toggle dropdown on arrow click
          />
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
          <input
            type="time"
            className="time-input"
            value={selectedTime}
            step="900" // Set time intervals to 15 minutes
            onChange={(e) => setSelectedTime(e.target.value)} // Update state on time change
            
          />
          </div>
        </div>

        <div className="text-wrapper-11">Additional Notes</div>
      </div>

      <div className="container-2">
        <button className="button-2">
          <div className="text-wrapper-12">Basketball</div>
        </button>

        <div className="avatar">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/BPOawRxV/img/rectangle@2x.png"
          />
        </div>

        <button className="button-3">
          <div className="text-wrapper-13">Soccer</div>
        </button>

        <div className="text-wrapper-14">My Profile</div>

        <div className="text-wrapper-15">My Sports</div>

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
          className="image-5"
          alt="Image"
          src="https://c.animaapp.com/BPOawRxV/img/image-15@2x.png"
        />
      </div>

      <div className="overlap-wrapper">
        <div className="overlap-5">
          <p className="october">
            October 5, 7:00 PM
            <br />
            Hamlin Tennis Center.
          </p>

          <div className="text-wrapper-21">Tennis</div>
        </div>
      </div>

      <div className="overlap-group-wrapper">
        <div className="overlap-6">
          <p className="p">
            October 1, 5:00 PM
            <br />
            Pottruck Gym
          </p>

          <div className="text-wrapper-21">Basketball</div>
        </div>
      </div>

      <div className="container-3">
        <div className="overlap-7">
          <p className="october-2">
            October 4, 5:00 PM
            <br />
            Pottruck Gym
          </p>

          <div className="text-wrapper-21">Basketball</div>
        </div>
      </div>

      <div className="container-4">
        <div className="overlap-8">
          <p className="october-3">
            October 2, 4:00 PM
            <br />
            Penn Park
          </p>

          <div className="text-wrapper-21">Soccer</div>
        </div>
      </div>

      <div className="container-5">
        <div className="overlap-9">
          <p className="october">
            October 3, 7:00 PM
            <br />
            Hamlin Tennis Center.
          </p>

          <div className="text-wrapper-21">Tennis</div>
        </div>
      </div>

      <div className="container-6">
        <p className="october-4">
          October 5, 4:00 PM
          <br />
          Penn Park
        </p>

        <div className="text-wrapper-22">Soccer</div>
      </div>

      <div className="textbox-11">
        <div className="text-wrapper-23">Soccer Group</div>

        <img
          className="ecology"
          alt="Ecology"
          src="https://c.animaapp.com/BPOawRxV/img/ecology.svg"
        />
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
