import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-body">
        <h1>About DoroIM</h1>
        <p>
          DoroIm is a dynamic platform designed to streamline the dormitory
          experience for college students. Our innovative app offers a
          comprehensive checklist of dorm essentials, ensuring you're equipped
          with everything you need for your space. From bedding to kitchenware,
          DoroIm helps you stay organized and prepared.
        </p>
        <p>
          But DoroIm is more than just a checklist. We understand the importance
          of maximizing small spaces, so we provide valuable tips and tricks for
          optimizing your dorm room layout and making the most of every square
          inch. Our platform also facilitates roommate connections by connecting
          individuals in search of housing or roommates with available options
          in their area.
        </p>
        <p>
          DoroIM incorporates user-friendly features such as checkboxes for
          essential items, customizable options to add more items as needed, and
          a robust system to prevent duplicate purchases. To enhance user
          experience, we've implemented a color-coded system to easily identify
          and differentiate each roommate's contributions and needs.
        </p>
        <p>
          We created this website with React and Node.js. We also stored the
          data and implemented user authentication with Firebase. Find the
          github{" "}
          <a
            href="https://github.com/r-oli-m/doroim"
            target="_blank"
            rel="noopener noreferrer"
          >
            here!
          </a>
        </p>
      </div>
    </div>
  );
};
export default About;
