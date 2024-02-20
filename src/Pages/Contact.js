import React from "react";
import CreateGroup from "../auth/CreateGroup";
import JoinGroup from "../auth/JoinGroup";
import "./Contact.css";

const Contact = ({ user }) => {
  return (
    <div className="groups-container">
      <CreateGroup user={user} />
      <JoinGroup />
    </div>
  );
};
export default Contact;
