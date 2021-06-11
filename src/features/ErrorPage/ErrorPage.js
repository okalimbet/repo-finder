import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {

  return (
    <section data-cy="error-container" className="errorpage-container">
      <div className="errorpage-titles-wrapper">
        <h1 className="errorpage-title-1">OOPS!</h1>
        <h2 className="errorpage-title-2">Something went wrong</h2>
        <h2 className="errorpage-title-3">Please, try again later</h2>
      </div>
    </section>
  )
}

export default ErrorPage;