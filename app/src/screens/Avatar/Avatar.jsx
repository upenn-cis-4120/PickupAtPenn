import PropTypes from "prop-types";
import React from "react";
import "./avatar.css";

export const Avatar = ({ avatarVariant, className, rectangleClassName }) => {
  return (
    <div className={`avatar ${className}`}>
      <img className={`rectangle ${rectangleClassName}`} alt="Rectangle" />
    </div>
  );
};

Avatar.propTypes = {
  avatarVariant: PropTypes.oneOf(["default"]),
};
