import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const msg = props.notification;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  console.log(msg);
  if (msg) {
    return <div style={style}>{msg}</div>;
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
