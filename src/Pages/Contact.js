// Contact.js
import React from "react";
import GroupContainer from "./GroupContainer";
import "./Contact.css";

const Contact = ({ user }) => {
  return (
    <div className="groups-container">
      <GroupContainer user={user} />
    </div>
  );
};
export default Contact;
