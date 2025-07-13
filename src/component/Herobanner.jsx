import React from 'react';
import '../styles/herobanner.css'; // Adjust the path as necessary

function HeroBanner() {
  return (
    <div className="hero-banner">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://i.pinimg.com/1200x/33/d9/bf/33d9bfa8c6ee759be6adddbdfb3842eb.jpg" 
          alt="Featured Movie Banner"
          className="hero-image"
        />
      </div>
      
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome</h1>
        
        <p className="hero-description">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        
        <div className="hero-actions">
          <input type="text" placeholder='search for a movie.......' />
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;