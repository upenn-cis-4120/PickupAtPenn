import PropTypes from "prop-types";
import React from "react";
import "./text-field.css";

export const TextField = ({ variant, className }) => {
  return <div className={`text-field ${className}`} />;
};

TextField.propTypes = {
  variant: PropTypes.oneOf(["outlined"]),
};
