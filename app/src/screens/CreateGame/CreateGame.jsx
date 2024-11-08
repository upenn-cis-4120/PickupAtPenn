import React from "react";
import "./style.css";

export const CreateGame = () => {
  return (
    <div className="create-game">
      <div className="container">
        <div className="div-wrapper">
          <p className="text-wrapper">
            Enter any additional notes, hashtags, and event types
          </p>
        </div>

        <div className="textbox">
          <div className="textfield">
            <p className="div">Enter player names or select from group chat</p>
          </div>

          <div className="text-wrapper-2">Players</div>
        </div>

        <div className="overlap">
          <div className="textbox-2">
            <div className="textfield">
              <div className="div">Select location</div>
            </div>

            <div className="text-wrapper-2">Location</div>
          </div>

          <img
            className="image"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-14@2x.png"
          />
        </div>

        <div className="textbox-3">
          <div className="text-wrapper-3">Create a New Game</div>

          <img
            className="close"
            alt="Close"
            src="https://c.animaapp.com/BPOawRxV/img/close.svg"
          />
        </div>

        <div className="overlap-group">
          <div className="textbox-4">
            <div className="text-wrapper-4">Sport</div>

            <div className="textfield-2">
              <div className="text-wrapper-5">Basketball</div>
            </div>
          </div>

          <img
            className="img"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-16@2x.png"
          />
        </div>

        <div className="overlap-2">
          <div className="textbox-5">
            <div className="text-wrapper-6">Select group chat</div>
          </div>

          <img
            className="image-2"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-17@2x.png"
          />
        </div>

        <button className="button">
          <div className="text-wrapper-7">Create Game</div>
        </button>

        <div className="overlap-3">
          <div className="textbox-6">
            <div className="text-wrapper-2">Skill Level</div>

            <div className="textfield-3">
              <div className="text-wrapper-8">Beginner</div>
            </div>
          </div>

          <img
            className="image-3"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-13@2x.png"
          />
        </div>

        <div className="textbox-7">
          <div className="text-wrapper-2">Date</div>

          <div className="textfield-4">
            <div className="text-wrapper-9">MM/DD/YYYY</div>
          </div>
        </div>

        <div className="overlap-group-2">
          <div className="textbox-8">
            <div className="text-wrapper-2">Number of Players</div>

            <div className="textfield-5">
              <div className="text">{""}</div>
            </div>
          </div>

          <img
            className="image-4"
            alt="Image"
            src="https://c.animaapp.com/BPOawRxV/img/image-18@2x.png"
          />
        </div>

        <div className="textbox-9">
          <div className="text-wrapper-10">Time</div>

          <div className="textfield-6">
            <div className="text-2">{""}</div>
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

      <button className="button-4">
        <div className="text-wrapper-24">Create New Game</div>
      </button>

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
