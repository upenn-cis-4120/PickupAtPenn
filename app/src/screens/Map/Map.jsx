import './style.css';
//import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from './marker.png';
//import { useNavigate } from "react-router-dom";


export const Map = () => {
  const pennCoordinates = [39.9522, -75.1932]; // Coordinates for the University of Pennsylvania
  const locations = [
    {
        name: 'Penn Park',
        position: [39.9500, -75.1868],
        description: 'A 24-acre athletic complex featuring synthetic turf fields, the Dunning-Cohen Champions Field with a seasonal air structure, the James "Ace" Adams Field, a multi-purpose stadium, and the 12-court Hamlin Tennis Center.',
      },
      {
        name: 'Hamlin Tennis Center',
        position: [39.9493, -75.1875],
        description: 'The outdoor home of Penn\'s men\'s and women\'s tennis teams, featuring 12 all-weather courts with stadium seating and views of the Philadelphia skyline.',
      },
      {
        name: 'The Palestra',
        position: [39.9513, -75.1885],
        description: 'Known as the "Cathedral of College Basketball," the Palestra is home to Penn\'s basketball, volleyball, gymnastics, and wrestling programs.',
      },
      {
        name: 'Pottruck Health and Fitness Center',
        position: [39.954, -75.1970],
        description: 'A state-of-the-art, 120,000-square-foot recreation facility serving the Penn community, offering fitness equipment, basketball courts, a climbing wall, and more.',
      },
      {
        name: 'Penn Squash Center',
        position: [39.9503, -75.1885],
        description: 'The newly renovated Penn Squash Center boosts 12 international squash courts, including a pair of championship glass-wall courts. Towels, showers and day lockers are available for use. Penn Squash Center is open to the Penn and local Philadelphia community.'
      },
      {
        name: 'Class of 1923 Ice Rink',
        position: [39.9517898, -75.1871317],
        description: 'The Class of 1923 Ice Rink is home to the Penn men\'s and women\'s ice hockey teams, featuring a 200-seat capacity seating bowl, a 100-seat club level, and a 200-square-foot pro shop.'
      }
    ];

    const sportsIcon = L.icon({
        iconUrl: markerIcon, // Path to your icon image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [25, 50], // Anchor of the icon (center-bottom)
        popupAnchor: [0, -50] // Position of the popup relative to the icon
      });

  return (
    <div className="map">
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
            <div className="text-wrapper-menu">Availability</div>
          </div>
          </Link>
          <div className="frame-3">
            <div className="text-wrapper-menu">Community</div>
          </div>

          <Link to="/map">
          <div className="frame-4">
            <div className="text-wrapper-bold">Map</div>
          </div>
          </Link>
        </div>
        <Link to="/">
        <div className="text-wrapper-menu-title">Pickup@Penn</div>
        </Link>

        <Link to="/availability">
        <img
          className="prof"
          alt="Image"
          src="https://c.animaapp.com/RqvJyPyX/img/image-27@2x.png"
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

      {/* Map Display */}
      <div className="map-container">
        <MapContainer
          center={pennCoordinates}
          zoom={15}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location, index) => (
            <Marker key={location.name} position={location.position} icon={sportsIcon}>
              <Popup>
                <strong>{location.name}</strong><br />
                {location.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      </div>
    );
};
   
