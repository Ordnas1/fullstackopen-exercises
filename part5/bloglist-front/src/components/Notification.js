import React from "react";

const Notification = ({ content }) => {
  if (!content) {
    return <div></div>;
  } else {
    return <div style={{ border: "1px black solid" }}>{content}</div>;
  }
};

export default Notification;
