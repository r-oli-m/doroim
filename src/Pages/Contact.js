// Contact.js
import React from "react";
import GroupContainer from "./GroupContainer";
import "./Contact.css";

const Contact = ({ user }) => { // Receive the user prop here
  return (
    <div className="groups-container">
      <GroupContainer user={user} /> {/* Pass the user prop to CreateGroupContainer */}
    </div>
  );
};
export default Contact;
