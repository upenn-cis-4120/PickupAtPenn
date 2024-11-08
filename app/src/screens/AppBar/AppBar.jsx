import PropTypes from "prop-types";
import React from "react";
import "./app-bar.css";

export const AppBar = ({ appbarVariant, className }) => {
  return <div className={`app-bar ${className}`} />;
};

AppBar.propTypes = {
  appbarVariant: PropTypes.oneOf(["default"]),
};
