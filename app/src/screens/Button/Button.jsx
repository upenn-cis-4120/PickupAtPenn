import PropTypes from "prop-types";
import React from "react";
import "./button.css";

export const Button = ({
  color,
  size,
  className,
  createNewGameClassName,
  text = "Basketball",
  text1 = "Create New Game",
}) => {
  return (
    <div className={`button ${color} ${className}`}>
      <div className={`create-new-game ${createNewGameClassName}`}>
        {color === "error" && <>{text1}</>}

        {color === "primary" && <>{text}</>}
      </div>
    </div>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "error"]),
  size: PropTypes.oneOf(["medium"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
