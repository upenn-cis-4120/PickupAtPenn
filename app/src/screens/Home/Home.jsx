import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';


export const Home = () => {
  const location = useLocation();
  const [games, setGames] = useState([
    { id: 1, data: ["Pickup basketball game at Pottruck in 30 mins  3 spots left",  "https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png", "Colin Speaker", "@cspeaker -- 1 hr"]},
    { id: 2, data: ["Penn Park fields are open and empty  Perfect for soccer.","https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png", "Angie Geralis", "@ageralis -- 5 hr"]}, 
  ]);

  useEffect(() => {
    if (location.state?.additionalNotes) {
      setGames(prevGames => [
        { id: Date.now(), data: [location.state.additionalNotes, "https://c.animaapp.com/RqvJyPyX/img/rectangle-2@2x.png", "Diana Lim", "@dianadl -- just now"] },
        ...prevGames
      ]);
    }
  }, [location.state]); // Only trigger when location.state changes

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
      {/* <div className="container">
        <p className="penn-park-fields-are">
          Penn Park fields are open and empty&nbsp;&nbsp;Perfect for soccer.
        </p>

        <button className="button">
          <div className="text-wrapper">View Location</div>
        </button>

        <div className="avatar">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/RqvJyPyX/img/rectangle@2x.png"
          />
        </div>

        <div className="overlap-group">
          <p className="div">@ageralis - 5 hr ago</p>

          <div className="text-wrapper-2">Angie Geralis</div>
        </div>
      </div>

      <div className="container-2">
        <p className="pickup-basketball">
          Pickup basketball game at Pottruck in 30 mins&nbsp;&nbsp;3 spots left
        </p>

        <button className="div-wrapper">
          <div className="text-wrapper-3">Join Game</div>
        </button>

        <div className="rectangle-wrapper">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/RqvJyPyX/img/rectangle-1@2x.png"
          />
        </div>

        <div className="overlap">
          <div className="text-wrapper-2">Colin Speaker</div>

          <div className="text-wrapper-4">@cspeaker - 1 hr</div>
        </div>
      </div> */}

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

      <div className="container-4">
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

      <div className="overlap-2">
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

      <div className="container-5">
        <p className="october">
          October 1, 5:00 PM
          <br />
          Pottruck Gym
        </p>

        <div className="text-wrapper-16">Basketball</div>
      </div>

      <div className="container-6">
        <p className="p">
          October 2, 4:00 PM
          <br />
          Penn Park
        </p>

        <div className="text-wrapper-17">Soccer</div>
      </div>

      <div className="container-7">
        <p className="october-2">
          October 3, 7:00 PM
          <br />
          Hamlin Tennis Center
        </p>

        <div className="text-wrapper-18">Tennis</div>
      </div>

      <div className="container-8">
        <p className="p">
          October 5, 4:00 PM
          <br />
          Penn Park
        </p>

        <div className="text-wrapper-17">Soccer</div>
      </div>

      <div className="container-9">
        <p className="october-2">
          October 5, 7:00 PM
          <br />
          Hamlin Tennis Center
        </p>

        <div className="text-wrapper-19">Tennis</div>
      </div>

      <div className="overlap-wrapper">
        <div className="overlap-3">
          <p className="october-3">
            October 4, 5:00 PM
            <br />
            Pottruck Gym
          </p>

          <div className="text-wrapper-20">Basketball</div>
        </div>
      </div>

      <div className="container-10">
        <p className="october-4">
          October 6, 5:00 PM
          <br />
          Pottruck Gym
        </p>

        <div className="text-wrapper-21">Basketball</div>
      </div>

      <div className="textbox-2">
        <div className="text-wrapper-22">Soccer Group</div>

        <img
          className="soccer-ball"
          alt="Soccer ball"
          src="https://c.animaapp.com/RqvJyPyX/img/soccer-ball.svg"
        />
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
