// Contact.js
import React from "react";
import CreateGroupContainer from "./CreateGroupContainer";
import "./Contact.css";

const Contact = ({ user }) => { // Receive the user prop here
  return (
    <div className="groups-container">
      <CreateGroupContainer user={user} /> {/* Pass the user prop to CreateGroupContainer */}
    </div>
  );
};
export default Contact;
