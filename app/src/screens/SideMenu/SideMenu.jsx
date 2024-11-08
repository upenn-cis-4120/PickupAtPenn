import PropTypes from "prop-types";
import React from "react";
//import "./side-menu.css";

export const SideMenu = ({ sidemenuVariant, className }) => {
  return (
    <div className={`side-menu ${className}`}>
      <button className="basketball-synthetic-wrapper">
        <div className="basketball-synthetic">Basketball</div>
      </button>

      <div className="rectangle-wrapper">
        <img className="img" alt="Rectangle" />
      </div>

      <button className="soccer-synthetic-wrapper">
        <div className="soccer-synthetic">Soccer</div>
      </button>

      <div className="my-profile-synthetic">My Profile</div>

      <div className="my-sports-synthetic">My Sports</div>

      <div className="diana-lim-synthetic">Diana Lim</div>

      <div className="dianadl-synthetic">@dianadl</div>

      <div className="edit-synthetic-clone">Edit</div>
    </div>
  );
};

SideMenu.propTypes = {
  sidemenuVariant: PropTypes.oneOf(["default"]),
};
