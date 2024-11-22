import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('profileData');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "Diana Lim",
      age: "20",
      gradYear: "2025",
      favoriteSport: "Basketball",
      email: "dlim@upenn.edu"
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile updated successfully!');
  };

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <div className="profile">
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

      {/* Edit Profile Container */}
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile-image-section">
            <img
              src="https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png"
              alt="Profile"
              className="profile-image disabled"
            />
            <button type="button" className="change-photo-btn disabled" disabled>
              Change Photo
            </button>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              disabled
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Graduation Year</label>
            <input
              type="number"
              name="gradYear"
              value={profileData.gradYear}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Favorite Sport</label>
            <select
              name="favoriteSport"
              value={profileData.favoriteSport}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="Basketball">Basketball</option>
              <option value="Soccer">Soccer</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Ultimate Frisbee">Ultimate Frisbee</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};