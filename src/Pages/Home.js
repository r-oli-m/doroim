import React from "react"; // Import useState and useEffect
import "./Home.css";
import dormAntImage from "./pictures/ant.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="mascot-img">
      <h2>Welcome to DoroIM!</h2>
      <p>I'm Doro, the dorm ant!</p>
        <img src={dormAntImage} alt="Dorm Ant" />
      </div>
    </div>
  );
}

export default Home;
