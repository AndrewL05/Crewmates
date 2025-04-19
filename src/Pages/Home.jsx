import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to the Crewmate Creator!</h1>
        <h3>Here is where you can create your very own set of crewmates before sending them off into space!</h3>
        
        <div className="crewmate-showcase">
          <img src="src/assets/red.png" alt="Red crewmate" className="showcase-img" />
          <img src="src/assets/blue.png" alt="Blue crewmate" className="showcase-img" />
          <img src="src/assets/green.png" alt="Green crewmate" className="showcase-img" />
          <img src="src/assets/yellow.png" alt="Yellow crewmate" className="showcase-img" />
        </div>
        
        <div className="action-buttons">
          <a href="/create" className="action-button create-button">Create Crewmate</a>
          <a href="/gallery" className="action-button gallery-button">View Gallery</a>
        </div>
      </div>
    </div>
  );
};

export default Home;