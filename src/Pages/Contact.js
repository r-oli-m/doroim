import React from "react";
import CreateGroupContainer from "../auth/CreateGroupContainer";
import JoinGroup from "../auth/JoinGroup";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="groups-container">
      <CreateGroupContainer />
      <JoinGroup />
    </div>
  );
};
export default Contact;
