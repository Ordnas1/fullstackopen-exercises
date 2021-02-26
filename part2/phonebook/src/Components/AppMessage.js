import React from "react";

const AppMessage = ({ message, type }) => {
  if (message === "") {
    return <div></div>;
  } else if (type === "error") {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};
export default AppMessage;
