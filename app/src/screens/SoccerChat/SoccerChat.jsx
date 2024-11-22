import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export const SoccerChat = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('soccerChatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        id: 1,
        sender: "Ella",
        text: "Penn Park fields are empty right now! Who wants to play soccer?",
        time: "3:15 PM"
      },
      {
        id: 2,
        sender: "Liam",
        text: "I can be there in 20! Anyone want to practice some drills?",
        time: "3:17 PM"
      },
      {
        id: 3,
        sender: "Nate",
        text: "Count me in! I'll bring some cones for practice",
        time: "3:18 PM"
      },
      {
        id: 4,
        sender: "Ella",
        text: "Awesome! Let's meet by the main entrance",
        time: "3:20 PM"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('soccerChatMessages', JSON.stringify(messages));
  }, [messages]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessages = [
        ...messages,
        {
          id: messages.length + 1,
          sender: "Diana",
          text: newMessage,
          time: currentTime
        }
      ];
      setMessages(newMessages);
      setNewMessage("");
    }
  };

  return (
    <div className="soccer-chat">
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
        </div>

        <Link to="/">
          <div className="text-wrapper-menu-title">Pickup@Penn</div>
        </Link>

        {/* <Link to="/profile">
          <img
            className="prof"
            alt="Image"
            src="https://c.animaapp.com/RqvJyPyX/img/image-27@2x.png"
          />
        </Link> */}

        <Link to="/">
          <img
            className="logo"
            alt="Image"
            src="https://c.animaapp.com/RqvJyPyX/img/image-28@2x.png"
          />
        </Link>
      </div>

      {/* Chat Interface */}
      <div className="chat-container">
        <div className="chat-header">
          <h2>Soccer Group</h2>
          <span className="member-count">38 members</span>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === "Diana" ? "message-own" : "message-other"}`}
            >
              <div className="message-header">
                <span className="message-sender">{message.sender}</span>
                <span className="message-time">{message.time}</span>
              </div>
              <div className="message-content">{message.text}</div>
            </div>
          ))}
        </div>

        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};
