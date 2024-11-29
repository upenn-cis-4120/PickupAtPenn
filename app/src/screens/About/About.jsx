import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="about">
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

        <Link to="/">
          <img
            className="logo"
            alt="Image"
            src="https://c.animaapp.com/RqvJyPyX/img/image-28@2x.png"
          />
        </Link>
      </div>

      {/* About Us Content */}
      <div className="about-content">
        <h1 className="about-title">About Pickup@Penn</h1>
        <div className="box">
          <p>
            Pickup@Penn is an application designed to address a common challenge for students at the University of Pennsylvania: organizing and participating in pickup sports games with friends. 
            The app integrates features like viewing individual and group schedules, creating games, accessing maps of game locations, and engaging with community groups and chats. 
            Through iterative prototyping and user feedback, we refined the design to meet the needs of this specific community.
          </p>
        </div>

        <div className="box">
          <h2 className="process-title">The Problem</h2>
          <p>
            Students at Penn often struggle to find and organize games due to fragmented tools (e.g., group chats, separate scheduling apps). 
            Pickup@Penn consolidates these activities into a single platform, promoting connection and engagement while reducing logistical barriers.
          </p>
        </div>

        <div className="box">
          <h2 className="goal-title">Goal</h2>
          <p>
            Our goal was to create a user-friendly interface that allows students to:
          </p>
          <ul>
            <li>Discover and join pickup games easily.</li>
            <li>Coordinate schedules with friends.</li>
            <li>Access relevant resources like maps and community groups in one app.</li>
          </ul>
        </div>

        <div className="box">
          <h2 className="design-process-title">Our Design Process</h2>
          <p>
            <strong>1. Lo-Fi Prototyping:</strong> 
            We began by creating two low-fidelity prototypes, each focusing on different aspects of usability:
          </p>
          <ul>
            <li><strong>Prototype 1:</strong> Focused on simplicity and quick actions. Evaluators appreciated its clarity and action-oriented design but suggested adding map functionality and Google Calendar integration.</li>
            <li><strong>Prototype 2:</strong> Included a wider range of features, such as filtering activities by sport and a community page. While feature-rich, evaluators felt the navigation was cumbersome.</li>
          </ul>
          <p>
            Key Insight: Users prefer a balance between simplicity and functionality. Overloading the interface hinders navigation, but a lack of features limits utility.
          </p>
        </div>

        <div className="box">
          <h2 className="insights-title">Key Insights</h2>
          <p>
            - Users appreciated the intuitive scheduling interface and map features.
            <br />
            - Simplified navigation reduced friction for common tasks, such as creating games or viewing schedules.
            <br />
            - Additional functionality, like expanded sport options and a "My Games" page, was identified as a potential future improvement.
          </p>
        </div>

        <div className="box">
          <h2 className="conclusion-title">Conclusion</h2>
          <p>
            Pickup@Penn creates a seamless way for students to engage in sports, build connections, and stay active. 
            Through user-centered design and continuous iteration, we’ve built a platform that enhances the community's experience while addressing their needs.
          </p>
        </div>
      </div>
    </div>
  );
};