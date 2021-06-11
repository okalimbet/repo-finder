import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div data-cy="loading-container" className="loading-wrapper">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loading;