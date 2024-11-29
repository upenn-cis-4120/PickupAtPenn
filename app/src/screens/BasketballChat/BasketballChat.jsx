import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export const BasketballChat = () => {
  const [messages, setMessages] = useState(() => {
    // Create a new flag specifically for chat sessions
    const chatSessionActive = sessionStorage.getItem('chatSessionActive');
    
    if (!chatSessionActive) {
      // Reset messages when starting a new session
      const defaultMessages = [
        {
          id: 1,
          sender: "Colin",
          text: "Anyone up for a game at Pottruck tonight at 7?",
          time: "2:30 PM"
        },
        {
          id: 2,
          sender: "Paul",
          text: "I'm in! Need to work on my jump shot",
          time: "2:32 PM"
        },
        {
          id: 3,
          sender: "Colin",
          text: "Great! I'll bring an extra ball just in case",
          time: "2:33 PM"
        },
        {
          id: 4,
          sender: "Paul",
          text: "Perfect, see you there! Anyone else joining?",
          time: "2:35 PM"
        }
      ];
      sessionStorage.setItem('chatSessionActive', 'true');
      return defaultMessages;
    }
    
    // Get existing messages from session
    const savedMessages = sessionStorage.getItem('basketballChatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Save messages to session storage when they change
  useEffect(() => {
    sessionStorage.setItem('basketballChatMessages', JSON.stringify(messages));
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
    <div className="basketball-chat">
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
              <div classsName="frame-about">
                <div className="text-wrapper-about">About</div>
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
          <h2>Basketball Group</h2>
          <span className="member-count">45 members</span>
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